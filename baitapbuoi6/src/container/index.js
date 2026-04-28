// src/container/index.js
// A simple Dependency Injection container (if we used classes, we'd inject here).
// Since we used module.exports = new StudentService() as a singleton, we can just export it.
// If you want actual DI, you'd instantiate classes here.
const studentService = require('../services/student.service');

module.exports = {
  studentService
};
