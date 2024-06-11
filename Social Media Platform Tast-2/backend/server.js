const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comments');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/socialmedia', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token, 'secret');
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
};

app.use('/api/users', userRoutes);
app.use('/api/posts', authMiddleware, postRoutes);
app.use('/api/comments', authMiddleware, commentRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
