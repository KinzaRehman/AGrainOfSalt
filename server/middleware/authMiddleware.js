const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function protect(req, res, next) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: 'Please log in.'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId)
      .select('username email motivation');

    if (!user) {
      return res.status(401).json({
        message: 'User not found.'
      });
    }

    req.user = user;
    next();

  } catch (error) {
    res.status(401).json({
      message: 'Session expired or invalid.'
    });
  }
}

module.exports = protect;