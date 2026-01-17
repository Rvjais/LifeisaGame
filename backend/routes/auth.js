const express = require('express');
const router = express.Router();
const User = require('../models/User');
const crypto = require('crypto');

// Helper to hash password
const hashPassword = (password) => {
    return crypto.createHash('sha256').update(password).digest('hex');
};

const connectDB = require('../db');

// Register
router.post('/register', async (req, res) => {
    await connectDB();
    const { username, password, name } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        const hashedPassword = hashPassword(password);
        const newUser = new User({
            username,
            passwordHash: hashedPassword,
            name: name || username,
            baseline: 50,
            goals: [],
            history: []
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    await connectDB();
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const hashedPassword = hashPassword(password);
        if (user.passwordHash !== hashedPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        res.status(200).json({ message: 'Login successful', user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Sync Data (Push)
router.post('/sync', async (req, res) => {
    await connectDB();
    const { username, password, data } = req.body;

    if (!username || !password || !data) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const hashedPassword = hashPassword(password);
        if (user.passwordHash !== hashedPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Update user data
        if (data.name) user.name = data.name;
        if (data.baseline) user.baseline = data.baseline;
        if (data.goals) user.goals = data.goals;
        if (data.history) user.history = data.history;

        user.updatedAt = Date.now();
        await user.save();

        res.status(200).json({ message: 'Sync successful', user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
