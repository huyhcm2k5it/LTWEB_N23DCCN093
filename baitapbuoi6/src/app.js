const express = require('express');
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const studentRoutes = require('./routes/student.routes');

const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom logger middleware
app.use(logger);

// Mount routers
app.use('/api/students', studentRoutes);

// Global error handler
app.use(errorHandler);

module.exports = app;
