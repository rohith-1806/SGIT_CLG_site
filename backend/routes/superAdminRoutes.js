const express = require('express');
const { getSuperAdminAnalytics, createAdmin, deleteAdmin, getAuditLogs, createDepartment } = require('../controllers/superAdminController');
const { protect } = require('../middlewares/auth');
const { authorize } = require('../middlewares/rbac');

const router = express.Router();

router.use(protect);
router.use(authorize('superadmin'));

router.get('/analytics', getSuperAdminAnalytics);
router.post('/create-admin', createAdmin);
router.delete('/admin/:id', deleteAdmin);
router.get('/audit-logs', getAuditLogs);
router.post('/departments', createDepartment);

module.exports = router;
