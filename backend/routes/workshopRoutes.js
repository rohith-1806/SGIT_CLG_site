const express = require('express');
const { getWorkshops, registerWorkshop, createWorkshop } = require('../controllers/workshopController');
const { protect } = require('../middlewares/auth');
const { authorize } = require('../middlewares/rbac');

const router = express.Router();

router.get('/', getWorkshops);
router.post('/:id/register', protect, registerWorkshop);
router.post('/', protect, authorize('admin', 'superadmin'), createWorkshop);

module.exports = router;
