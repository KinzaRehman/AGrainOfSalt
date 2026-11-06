// Verifies the signed login cookie and loads its account before allowing a protected request.
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

    // Verification checks both the signature and expiry; decoding alone would not be enough.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId)
      .select('username email motivation +sessionVersion');

    if (!user) {
      return res.status(401).json({
        message: 'User not found.'
      });
    }

    if ((decoded.sessionVersion || 0) !== (user.sessionVersion || 0)) {
      return res.status(401).json({ message: 'Please log in again.' });
    }

    req.user = { id: user._id, username: user.username, email: user.email, motivation: user.motivation };
    next();

  } catch (error) {
    res.status(401).json({
      message: 'Session expired or invalid.'
    });
  }
}

module.exports = protect;