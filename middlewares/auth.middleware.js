const auth = (req, res, next) => {
  const { role, pass } = req.headers;
  console.log('Received headers:', req.headers); // Debugging headers
  if (role === 'admin' && pass === 'saveEarth') {
    next();
  } else {
    res.status(403).json({ message: 'Not Authorized' });
  }
};

module.exports = auth;
