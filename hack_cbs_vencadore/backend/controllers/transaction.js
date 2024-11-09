const pClient = require('../db/client');
const { calculateNewStreak } = require('../helpers/streakChecker');

async function createTransaction(req, res) {
    const { userId, originalAmount, currentBankBalance } = req.body;

    try {
        const user = await pClient.user.findUnique({
            where: { id: userId }
        });

        if (!user) return res.status(404).json({ message: "User not found" });

        let savedAmount;
        const roundingOption = user.roundingOption;

        switch (roundingOption) {
            case 'nearestWhole':
                savedAmount = Math.ceil(originalAmount);
                break;
            case 'nearest10':
                savedAmount = Math.ceil(originalAmount / 10) * 10;
                break;
            case 'plus5':
                savedAmount = originalAmount + 5;
                break;
            default:
                savedAmount = originalAmount;
        }

        if (savedAmount > currentBankBalance) {
            return res.status(400).json({ message: "Insufficient bank balance" });
        }

        const transactionResult = await pClient.$transaction(async (prisma) => {
            let remainingAmount = savedAmount;
            let allocatedGoalId = null;

            const userWithGoals = await prisma.user.findUnique({
                where: { id: userId },
                include: { goals: { where: { isRedeemed: false }, orderBy: { createdAt: 'asc' } } }
            });

            if (!userWithGoals) return res.status(404).json({ message: "User not found" });
            for (const goal of userWithGoals.goals) {
                const neededAmount = goal.amount - goal.savedAmount;

                if (remainingAmount >= neededAmount) {
                    await prisma.goal.update({
                        where: { id: goal.id },
                        data: { savedAmount: goal.amount, isRedeemed: true },
                    });
                    remainingAmount -= neededAmount;
                } else {
                    await prisma.goal.update({
                        where: { id: goal.id },
                        data: { savedAmount: { increment: remainingAmount } },
                    });
                    allocatedGoalId = goal.id;
                    remainingAmount = 0;
                    break;
                }
            }
            if (remainingAmount > 0) {
                await prisma.user.update({
                    where: { id: userId },
                    data: { totalSavings: { increment: remainingAmount } },
                });
            }
            await prisma.user.update({
                where: { id: userId },
                data: { totalSavingsToDate: { increment: savedAmount } },
            });

            const newStreak = calculateNewStreak(userWithGoals.lastSaveDate);
            await prisma.user.update({
                where: { id: userId },
                data: {
                    currentStreak: newStreak,
                    maxStreak: Math.max(userWithGoals.maxStreak, newStreak),
                    lastSaveDate: new Date(),
                },
            });
            const transaction = await prisma.transaction.create({
                data: {
                    userId,
                    goalId: allocatedGoalId,
                    originalAmount,
                    saved: savedAmount,
                    nearestRoundUp: roundingOption,
                    createdAt: new Date(),
                }
            });
            await prisma.user.update({
                where: { id: userId },
                data: { bankBalance: { decrement: savedAmount } }
            });

            return transaction;
        });
        res.status(201).json(transactionResult);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = { createTransaction };

