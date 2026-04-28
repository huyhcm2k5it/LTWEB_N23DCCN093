const express = require('express');
const studentController = require('../controllers/student.controller');
const validateObjectId = require('../middlewares/validateObjectId');

const router = express.Router();

// Advanced routes (must be before /:id to avoid 'top' or 'stats' being treated as an id)
router.get('/top', studentController.getTopStudents);
router.get('/stats/avg', studentController.getAverageScore);
router.get('/search', studentController.searchStudents);

// CRUD routes
router.route('/')
  .post(studentController.createStudent)
  .get(studentController.getStudents);

router.route('/:id')
  .get(validateObjectId, studentController.getStudentById)
  .put(validateObjectId, studentController.updateStudent)
  .delete(validateObjectId, studentController.softDeleteStudent);

// Specific fields update
router.patch('/:id/score', validateObjectId, studentController.updateScore);

module.exports = router;
