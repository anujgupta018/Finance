const pClient = require('../db/client');

async function getGoals(req, res) {
    const { userId } = req.body;

    try {
        const goals = await pClient.goal.findMany({
            where: { userId },
            orderBy: { createdAt: 'asc' }
        });

        res.status(200).json(goals);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


async function createGoal(req, res) {
    const { userId, name, day, month, year, amount, type } = req.body;

    try {
        const goal = await pClient.goal.create({
            data: {
                userId,
                name,
                day,
                month,
                year,
                amount,
                type, // New field for goal type
                savedAmount: 0,
                isRedeemed: false,
                createdAt: new Date()
            }
        });

        res.status(201).json(goal);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = { createGoal, getGoals };
