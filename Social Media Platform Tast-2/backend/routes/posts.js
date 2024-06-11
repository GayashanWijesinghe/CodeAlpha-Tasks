const express = require('express');
const router = express.Router();
const Post = require('../models/post');

// Create Post
router.post('/', async (req, res) => {
    try {
        const post = new Post({ ...req.body, user: req.user.id });
        await post.save();
        res.status(201).send(post);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Like Post
router.post('/:id/like', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).send('Post not found');

        if (post.likes.includes(req.user.id)) return res.status(400).send('Already liked');

        post.likes.push(req.user.id);
        await post.save();
        res.send('Liked successfully');
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
