const { studentService } = require('../container');

class StudentController {
  async createStudent(req, res, next) {
    try {
      const student = await studentService.createStudent(req.body);
      res.status(201).json({ success: true, data: student });
    } catch (error) {
      next(error);
    }
  }

  async getStudents(req, res, next) {
    try {
      const result = await studentService.getStudents(req.query);
      res.status(200).json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  }

  async getStudentById(req, res, next) {
    try {
      const student = await studentService.getStudentById(req.params.id);
      if (!student) {
        return res.status(404).json({ success: false, message: 'Student not found' });
      }
      res.status(200).json({ success: true, data: student });
    } catch (error) {
      next(error);
    }
  }

  async updateStudent(req, res, next) {
    try {
      const student = await studentService.updateStudent(req.params.id, req.body);
      if (!student) {
        return res.status(404).json({ success: false, message: 'Student not found' });
      }
      res.status(200).json({ success: true, data: student });
    } catch (error) {
      next(error);
    }
  }

  async softDeleteStudent(req, res, next) {
    try {
      const student = await studentService.softDeleteStudent(req.params.id);
      if (!student) {
        return res.status(404).json({ success: false, message: 'Student not found' });
      }
      res.status(200).json({ success: true, message: 'Student deleted successfully' });
    } catch (error) {
      next(error);
    }
  }

  async updateScore(req, res, next) {
    try {
      const { score } = req.body;
      const student = await studentService.updateScore(req.params.id, score);
      res.status(200).json({ success: true, data: student });
    } catch (error) {
      next(error);
    }
  }

  async getTopStudents(req, res, next) {
    try {
      const { limit } = req.query;
      const students = await studentService.getTopStudents(limit);
      res.status(200).json({ success: true, count: students.length, data: students });
    } catch (error) {
      next(error);
    }
  }

  async getAverageScore(req, res, next) {
    try {
      const stats = await studentService.getAverageScore();
      res.status(200).json({ success: true, data: stats });
    } catch (error) {
      next(error);
    }
  }

  async searchStudents(req, res, next) {
    try {
      const { q } = req.query;
      const students = await studentService.searchStudentsByName(q);
      res.status(200).json({ success: true, count: students.length, data: students });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new StudentController();
