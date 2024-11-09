const express = require('express');
const { createGoal, getGoals } = require('../controllers/goal');

const router = express.Router();

router.post('/', createGoal);
router.get('/get-all', getGoals);

module.exports = router;
