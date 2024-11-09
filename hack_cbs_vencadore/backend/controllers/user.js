const pClient = require('../db/client');

async function getUserTransactionDetails(req, res) {
    const { userId } = req.body;

    try {
        const user = await pClient.user.findUnique({
            where: { id: userId },
            include: {
                transactions: true,
                goals: true
            }
        });

        if (!user) return res.status(404).json({ message: "User not found" });

        const totalGoalSavings = user.goals.reduce((sum, goal) => sum + goal.savedAmount, 0);
        const savingsCloseToBalance = totalGoalSavings > user.bankBalance * 0.9;

        res.status(200).json({
            transactions: user.transactions,
            totalSavings: user.totalSavingsToDate,
            goals: user.goals.map(goal => ({
                id: goal.id,
                name: goal.name,
                type: goal.type,
                savedAmount: goal.savedAmount,
                targetAmount: goal.amount,
                isRedeemed: goal.isRedeemed
            })),
            bankBalance: user.bankBalance,
            savingsCloseToBalance
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

async function updateWeeklyOrEmail(req, res) {
    const { userId, weeklySummary, emailNotifications } = req.body;

    try {
        const user = await pClient.user.update({
            where: { id: userId },
            data: {
                weeklySummary,
                emailNotifications
            }
        });

        res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

async function updateRoundingOption(req, res) {
    const { userId, roundingOption } = req.body;

    try {
        const user = await pClient.user.update({
            where: { id: userId },
            data: { roundingOption }
        });

        res.status(200).json({ message: "Rounding option updated successfully", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = { getUserTransactionDetails, updateRoundingOption, updateWeeklyOrEmail };
