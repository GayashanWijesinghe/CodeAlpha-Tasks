const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Register
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = new User({ username, password });
        await user.save();
        res.status(201).send(user);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) return res.status(400).send('Invalid credentials');
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send('Invalid credentials');
        
        const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).send(err);
    }
});

// Follow
router.post('/:id/follow', async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const targetUser = await User.findById(req.params.id);

        if (!targetUser) return res.status(404).send('User not found');
        if (user.following.includes(targetUser._id)) return res.status(400).send('Already following');

        user.following.push(targetUser._id);
        targetUser.followers.push(user._id);

        await user.save();
        await targetUser.save();

        res.send('Followed successfully');
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
