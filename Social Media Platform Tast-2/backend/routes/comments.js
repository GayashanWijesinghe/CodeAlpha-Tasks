const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');

// Create Comment
router.post('/', async (req, res) => {
    try {
        const comment = new Comment({ ...req.body, user: req.user.id });
        await comment.save();
        res.status(201).send(comment);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;
