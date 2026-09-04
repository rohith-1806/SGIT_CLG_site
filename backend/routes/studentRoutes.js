const express = require('express');
const {
  getStudentProfile,
  updateStudentProfile,
  getAcademicProfile,
  saveSemesterProgress,
  updateSemesterProgress,
  deleteSubject,
  getCGPAMetrics,
  calculateAndSaveCGPA
} = require('../controllers/studentController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

// All student routes require authentication
router.use(protect);

// Student Profile Endpoints
router.route('/profile')
  .get(getStudentProfile)
  .put(updateStudentProfile);

// Student Academic Endpoints
router.route('/academic')
  .get(getAcademicProfile);

router.route('/academic/semester')
  .post(saveSemesterProgress);

router.route('/academic/semester/:semesterId')
  .put(updateSemesterProgress);

router.route('/academic/subject/:subjectId')
  .delete(deleteSubject);

// CGPA Endpoints
router.route('/cgpa')
  .get(getCGPAMetrics);

router.route('/cgpa/calculate')
  .post(calculateAndSaveCGPA);

module.exports = router;
