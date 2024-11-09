const { startOfDay, endOfDay, startOfWeek, endOfWeek } = require('date-fns');
const { sendEmailNotification } = require("../helpers/sendEmail");

const pClient = require('../db/client');

const sendDailyNotification = async (userId) => {
    try {
        const user = await pClient.user.findFirst({
            where: { id: userId },
        });

        if (!user || !user.emailNotifications) return;

        const todayStart = startOfDay(new Date());
        const todayEnd = endOfDay(new Date());

        const transactions = await pClient.transaction.findMany({
            where: {
                userId: userId,
                createdAt: {
                    gte: todayStart,
                    lte: todayEnd,
                },
            },
        });

        const totalTodaySavings = transactions.reduce((total, txn) => total + txn.saved, 0);

        if (totalTodaySavings > 0) {
            const message = `You saved a total of $${totalTodaySavings} today! Keep up the great work!`;
            await sendEmailNotification(user.email, message);
        }
    } catch (error) {
        console.error('Error sending daily notification:', error);
    }
};


const sendWeeklySummaries = async () => {
    try {
        const users = await pClient.user.findMany({
            where: { weeklySummary: true },
        });

        for (const user of users) {
            const weekStart = startOfWeek(new Date());
            const weekEnd = endOfWeek(new Date());

            const transactions = await pClient.transaction.findMany({
                where: {
                    userId: user.id,
                    createdAt: {
                        gte: weekStart,
                        lte: weekEnd,
                    },
                },
            });

            const weeklySavings = transactions.reduce((total, txn) => total + txn.saved, 0);

            if (weeklySavings > 0 && user.emailNotifications) {
                const message = `Weekly Summary: You saved a total of $${weeklySavings} this week!`;
                await sendEmailNotification(user.email, message);
            }
        }
    } catch (error) {
        console.error('Error sending weekly summaries:', error);
    }
};

module.exports = { sendDailyNotification, sendWeeklySummaries };
