const express = require('express');
const { createTransaction} = require('../controllers/transaction');

const router = express.Router();

router.post('/create', createTransaction);

module.exports = router;
