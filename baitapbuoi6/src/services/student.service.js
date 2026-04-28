const Student = require('../models/Student');

class StudentService {
  async createStudent(data) {
    const student = new Student(data);
    return await student.save();
  }

  async getStudents(query) {
    const { page = 1, limit = 10, major } = query;
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    let filter = { isActive: true };
    if (major) {
      filter.major = major;
    }

    const students = await Student.find(filter)
      .skip(skip)
      .limit(limitNum)
      .sort({ createdAt: -1 });

    const total = await Student.countDocuments(filter);

    return {
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum),
      data: students
    };
  }

  async getStudentById(id) {
    return await Student.findOne({ _id: id, isActive: true });
  }

  async updateStudent(id, data) {
    return await Student.findOneAndUpdate(
      { _id: id, isActive: true },
      data,
      { new: true, runValidators: true }
    );
  }

  async softDeleteStudent(id) {
    return await Student.findOneAndUpdate(
      { _id: id, isActive: true },
      { isActive: false },
      { new: true }
    );
  }

  async updateScore(id, score) {
    if (score === undefined || score < 0 || score > 100) {
      const error = new Error('Score must be a number between 0 and 100');
      error.statusCode = 400;
      throw error;
    }

    const student = await Student.findOneAndUpdate(
      { _id: id, isActive: true },
      { score: score },
      { new: true, runValidators: true }
    );

    if (!student) {
      const error = new Error('Student not found');
      error.statusCode = 404;
      throw error;
    }

    return student;
  }

  async getTopStudents(limitParam = 5) {
    const limit = parseInt(limitParam, 10);
    return await Student.find({ isActive: true })
      .sort({ score: -1 })
      .limit(limit);
  }

  async getAverageScore() {
    const result = await Student.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: null,
          averageScore: { $avg: '$score' },
          totalStudents: { $sum: 1 }
        }
      }
    ]);

    if (result.length === 0) {
      return { averageScore: 0, totalStudents: 0 };
    }

    return {
      averageScore: Number(result[0].averageScore.toFixed(2)),
      totalStudents: result[0].totalStudents
    };
  }

  async searchStudentsByName(keyword) {
    if (!keyword) {
      return [];
    }
    
    return await Student.find({
      isActive: true,
      name: { $regex: keyword, $options: 'i' }
    });
  }
}

module.exports = new StudentService();
