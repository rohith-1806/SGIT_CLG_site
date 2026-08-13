const express = require('express');
const { getProjects, createProject, starProject } = require('../controllers/projectController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

router.get('/', getProjects);
router.post('/', protect, createProject);
router.put('/:id/star', protect, starProject);

module.exports = router;
