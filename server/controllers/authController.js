// Handles signup, login, logout, and password recovery. The database stores password hashes and reset-token hashes.
const User = require('../models/User');
const findUserByEmail = require('../services/findUserByEmail');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('node:crypto');
const { sendPasswordReset } = require('../services/passwordResetEmail');

// Sign a seven-day session token and store it in a cookie that browser JavaScript cannot read.
function setTokenCookie(res, userId, sessionVersion = 0) {
  const token = jwt.sign(
    { userId, sessionVersion },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
}

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (
      typeof username !== 'string' ||
      typeof email !== 'string' ||
      typeof password !== 'string' ||
      !username.trim() ||
      !email.trim() ||
      password.length < 8 ||
      Buffer.byteLength(password, 'utf8') > 72
    ) {
      return res.status(400).json({
        message: 'Enter a username, email, and password of 8–72 characters.'
      });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanUsername = username.trim();

    const existingUser = await User.findOne({
      $or: [
        { email: cleanEmail },
        { username: cleanUsername }
      ]
    });

    if (existingUser || await findUserByEmail(cleanEmail)) {
      return res.status(409).json({
        message: 'Email or username already exists.'
      });
    }

// Hash the password before saving. Password capitalization and spaces are preserved.
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      username: cleanUsername,
      email: cleanEmail,
      password: hashedPassword
    });

    setTokenCookie(res, user._id.toString(), user.sessionVersion || 0);

    res.status(201).json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: 'Email or username already exists.'
      });
    }

    console.error(error);
    res.status(500).json({ message: 'Signup failed.' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (typeof email !== 'string' || typeof password !== 'string') {
      return res.status(400).json({
        message: 'Email and password are required.'
      });
    }

    const user = await findUserByEmail(email, '+password +sessionVersion');

    if (!user) {
      return res.status(401).json({
        message: 'Invalid email or password.'
      });
    }

    if (typeof user.password !== 'string' || !/^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$/.test(user.password)) {
      return res.status(401).json({
        message: 'Unable to log in. Use Forgot your password to reset your password, then try again.'
      });
    }

    // bcrypt checks the exact entered password against the stored hash.
    const validPassword = await bcrypt.compare(
      password,
      user.password
    );

    if (!validPassword) {
      return res.status(401).json({
        message: 'Invalid email or password.'
      });
    }

    setTokenCookie(res, user._id.toString(), user.sessionVersion || 0);

    res.json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Login failed.' });
  }
};

exports.logout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  });

  res.json({ message: 'Logged out.' });
};

exports.getMe = (req, res) => {
  res.json({ user: req.user });
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return res.status(400).json({ message: 'Enter a valid email address.' });
    }
    const user = await findUserByEmail(email);
    if (user) {
      // Send the raw token in the link, but save only its hash in MongoDB.
      const token = crypto.randomBytes(32).toString('hex');
      const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
      await User.updateOne({ _id: user._id }, { $set: {
        passwordResetToken: tokenHash,
        passwordResetExpires: new Date(Date.now() + 30 * 60 * 1000)
      } });
      const resetUrl = new URL('/reset-password', process.env.CLIENT_URL || 'http://localhost:5173');
      resetUrl.searchParams.set('token', token);
      try {
        await sendPasswordReset(user.email.trim().toLowerCase(), resetUrl.toString());
      } catch (error) {
        await User.updateOne({ _id: user._id, passwordResetToken: tokenHash }, {
          $unset: { passwordResetToken: 1, passwordResetExpires: 1 }
        });
        console.error('Password recovery delivery failed:', error.message);
      }
    }
    // Keep the response the same for known and unknown emails to avoid revealing accounts.
    const terminalDelivery = process.env.NODE_ENV !== 'production' &&
      (!process.env.RESEND_API_KEY || !process.env.EMAIL_FROM);
    return res.json({ message: terminalDelivery
      ? 'If that email belongs to an account, the reset link is in the terminal running the server. No email is sent in this local setup. Open the latest link from that terminal within 30 minutes.'
      : 'If an account exists for that email, a password reset link has been sent. The link expires in 30 minutes.' });
  } catch (error) {
    console.error('Password recovery failed:', error.message);
    return res.status(500).json({ message: 'Unable to request a reset. Please try again.' });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    if (typeof token !== 'string' || !/^[a-f0-9]{64}$/.test(token)) {
      return res.status(400).json({ message: 'This reset link is invalid. Request a new one.' });
    }
    if (typeof password !== 'string' || password.length < 8 || Buffer.byteLength(password, 'utf8') > 72) {
      return res.status(400).json({ message: 'Use at least 8 characters and at most 72 bytes for your password.' });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    // Match and consume an unexpired token in one operation so it cannot be reused.
    const user = await User.findOneAndUpdate({
      passwordResetToken: crypto.createHash('sha256').update(token).digest('hex'),
      passwordResetExpires: { $gt: new Date() }
    }, {
      $set: { password: hashedPassword },
      $unset: { passwordResetToken: 1, passwordResetExpires: 1 },
      // Older login cookies have the previous version and will no longer be accepted.
      $inc: { sessionVersion: 1 }
    });
    if (!user) {
      return res.status(400).json({ message: 'This reset link has expired or was already used. Request a new one.' });
    }
    res.clearCookie('token', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax' });
    return res.json({ message: 'Password updated. You can now log in with your new password.' });
  } catch (error) {
    console.error('Password reset failed:', error.message);
    return res.status(500).json({ message: 'Unable to reset your password. Please try again.' });
  }
};
