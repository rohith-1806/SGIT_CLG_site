const express = require('express');
const { analyzeResume, getScanHistory } = require('../controllers/atsController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

router.use(protect);

router.post('/analyze', analyzeResume);
router.get('/history', getScanHistory);

module.exports = router;
