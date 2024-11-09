const bcrypt = require('bcrypt');
const pClient = require('../db/client');

async function signup(req, res) {
    const { email, password, username } = req.body;
    try {
        const existingUser = await pClient.user.findFirst({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await pClient.user.create({
            data: {
                email,
                username,
                password: hashedPassword,
                emailNotifications: true,
                weeklySummary: true,
            },
        });

        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { signup };
