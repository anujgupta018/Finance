const express = require('express');
const bodyParser = require('body-parser');
const goalRoutes = require('./routes/goalRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const { sendDailyNotification, sendWeeklySummaries } = require("./controllers/notification");
const { schedule } = require("node-cron");
const pClient = require('./db/client');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(bodyParser.json());

app.use('/goals', goalRoutes);
app.use('/transactions', transactionRoutes);
app.use('/users', userRoutes);
app.use('/auth', authRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

schedule('0 0 * * 0', async () => {
  try {
    console.log('Running weekly summary job');
    await sendWeeklySummaries();
  } catch (error) {
    console.error('Error in weekly summary job:', error);
  }
});

schedule('0 8 * * *', async () => {
  try {
    console.log('Running daily notification job');
    const users = await pClient.user.findMany({
      where: { emailNotifications: true },
    });
    for (const user of users) {
      await sendDailyNotification(user.id);
    }
  } catch (error) {
    console.error('Error in daily notification job:', error);
  }
});
