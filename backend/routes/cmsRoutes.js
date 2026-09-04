const express = require('express');
const { getCMSContent, updateCMSContent } = require('../controllers/cmsController');
const { protect } = require('../middlewares/auth');
const { authorize } = require('../middlewares/rbac');

const router = express.Router();

router.get('/content', getCMSContent);
router.get('/content/:sectionKey', getCMSContent);

// Super Admin CMS Edit Permission
router.put('/content/:sectionKey', protect, authorize('superadmin'), updateCMSContent);

module.exports = router;
