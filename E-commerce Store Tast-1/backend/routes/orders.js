const express = require('express');
const router = express.Router();

let orders = [];

router.post('/', (req, res) => {
    const order = req.body;
    orders.push(order);
    res.status(201).send(order);
});

module.exports = router;

