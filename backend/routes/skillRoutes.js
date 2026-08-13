const express = require('express');
const { getSkills, createSkill } = require('../controllers/skillController');
const { protect } = require('../middlewares/auth');
const { authorize } = require('../middlewares/rbac');

const router = express.Router();

router.get('/', getSkills);
router.post('/', protect, authorize('admin', 'superadmin'), createSkill);

module.exports = router;
