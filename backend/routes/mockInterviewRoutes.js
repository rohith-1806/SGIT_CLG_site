const express = require('express');
const { getQuestions, submitInterview, getHistory } = require('../controllers/mockInterviewController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

router.use(protect);

router.get('/questions', getQuestions);
router.post('/submit', submitInterview);
router.get('/history', getHistory);

module.exports = router;
