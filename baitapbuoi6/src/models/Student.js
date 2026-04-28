const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: [true, 'Student ID is required'],
    unique: true,
    trim: true
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
  },
  score: {
    type: Number,
    min: [0, 'Score cannot be less than 0'],
    max: [100, 'Score cannot be more than 100'],
    default: 0
  },
  major: {
    type: String,
    enum: {
      values: ['IT', 'Business', 'Design', 'Marketing'],
      message: '{VALUE} is not a valid major'
    },
    required: [true, 'Major is required']
  },
  enrollmentDate: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Student', studentSchema);
