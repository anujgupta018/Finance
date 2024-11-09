const express = require('express');
const { getUserTransactionDetails, updateRoundingOption, updateWeeklyOrEmail } = require('../controllers/user');

const router = express.Router();

router.post('/transactions', getUserTransactionDetails);
router.post('/rounding-option', updateRoundingOption);
router.post('/weekly-summary', updateWeeklyOrEmail);

module.exports = router;
