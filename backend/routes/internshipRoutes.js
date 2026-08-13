const express = require('express');
const { getInternships, createInternship, deleteInternship } = require('../controllers/internshipController');
const { protect } = require('../middlewares/auth');
const { authorize } = require('../middlewares/rbac');

const router = express.Router();

router.get('/', getInternships);
router.post('/', protect, authorize('admin', 'superadmin'), createInternship);
router.delete('/:id', protect, authorize('admin', 'superadmin'), deleteInternship);

module.exports = router;
