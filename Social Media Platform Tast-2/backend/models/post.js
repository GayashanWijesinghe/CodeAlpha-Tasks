const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: String,
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    createdAt: { type: Date, default: Date.now }
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
