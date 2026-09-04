const express = require('express');
const { 
  getYouTubeResources, 
  createYouTubeResource, 
  updateYouTubeResource, 
  deleteYouTubeResource 
} = require('../controllers/youtubeController');
const { protect } = require('../middlewares/auth');
const { authorize } = require('../middlewares/rbac');

const router = express.Router();

router.get('/', getYouTubeResources);
router.post('/', protect, authorize('admin', 'superadmin'), createYouTubeResource);
router.put('/:id', protect, authorize('admin', 'superadmin'), updateYouTubeResource);
router.delete('/:id', protect, authorize('admin', 'superadmin'), deleteYouTubeResource);

module.exports = router;
