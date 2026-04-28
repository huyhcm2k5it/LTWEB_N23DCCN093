const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Handle Mongoose validation errors
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(val => val.message);
    message = messages.join(', ');
    return res.status(400).json({ success: false, message });
  }

  // Handle Mongoose duplicate key errors
  if (err.code === 11000) {
    message = 'Duplicate field value entered';
    return res.status(400).json({ success: false, message });
  }

  // Handle CastError (invalid ObjectId) - Fallback
  if (err.name === 'CastError') {
    message = `Resource not found with id of ${err.value}`;
    return res.status(404).json({ success: false, message });
  }

  res.status(statusCode).json({
    success: false,
    message: message
  });
};

module.exports = errorHandler;
