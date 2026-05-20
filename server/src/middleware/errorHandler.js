const { ZodError } = require('zod');

const errorHandler = (err, req, res, next) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: 'Validation error',
      details: err.errors.map((e) => ({ field: e.path.join('.'), message: e.message })),
    });
  }

  if (err.code === 'P2002') {
    return res.status(409).json({ error: 'A record with this value already exists' });
  }

  const status = err.status || 500;
  const message = err.message || 'Internal server error';
  res.status(status).json({ error: message });
};

module.exports = errorHandler;
