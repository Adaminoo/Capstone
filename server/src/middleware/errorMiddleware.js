function errorHandler(err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong' });
  }
  // Goes to main server.js
  module.exports = errorHandler;
  