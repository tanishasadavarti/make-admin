const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`URL: ${req.url}, Method: ${req.method}, Timestamp: ${timestamp}`);
  next();
};

module.exports = logger;