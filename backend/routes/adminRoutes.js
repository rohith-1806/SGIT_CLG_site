const express = require('express');
const { getAdminStats, getStudents, createStudent, toggleBlockStudent, broadcastNotification } = require('../controllers/adminController');
const { protect } = require('../middlewares/auth');
const { authorize } = require('../middlewares/rbac');

const router = express.Router();

router.use(protect);
router.use(authorize('admin', 'superadmin'));

router.get('/stats', getAdminStats);
router.get('/students', getStudents);
router.post('/students', createStudent);
router.put('/students/:id/toggle-block', toggleBlockStudent);
router.post('/notifications/broadcast', broadcastNotification);

module.exports = router;
