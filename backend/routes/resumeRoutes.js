const express = require('express');
const { getResumes, getResume, createResume, updateResume, deleteResume } = require('../controllers/resumeController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getResumes)
  .post(createResume);

router.route('/:id')
  .get(getResume)
  .put(updateResume)
  .delete(deleteResume);

module.exports = router;
