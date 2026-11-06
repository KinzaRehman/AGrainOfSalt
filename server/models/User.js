// Defines the account fields stored in MongoDB. Passwords are bcrypt hashes, not readable passwords.
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },

  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true
  },

  password: {
    type: String,
    required: true,
    select: false
  },

  // select: false leaves these private fields out of normal account queries.
  passwordResetToken: { type: String, select: false },
  passwordResetExpires: { type: Date, select: false },
  sessionVersion: { type: Number, default: 0, select: false },

  motivation: {
    type: String,
    default: ''
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);