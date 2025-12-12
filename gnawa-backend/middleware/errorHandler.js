exports.errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message);
  console.error('Stack:', err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({ 
      error: 'Validation Error',
      details: err.errors.map(e => e.message) 
    });
  }

  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({ 
      error: 'Duplicate entry',
      details: err.errors.map(e => e.message) 
    });
  }

  res.status(statusCode).json({ error: message });
};