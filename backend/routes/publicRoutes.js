const express = require('express');
const { submitContact, getLandingStats, getDepartments } = require('../controllers/publicController');

const router = express.Router();

router.post('/contact', submitContact);
router.get('/stats', getLandingStats);
router.get('/departments', getDepartments);

module.exports = router;
