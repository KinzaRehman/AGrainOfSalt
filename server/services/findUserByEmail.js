// Finds accounts without treating email capitalization as significant, including older emails with surrounding spaces.
const User = require('../models/User');

// Older accounts may have been saved before email normalization was added.
module.exports = async function findUserByEmail(email, selection = '') {
  const normalized = email.trim().toLowerCase();
  const exact = await User.findOne({ email: normalized }).select(selection);
  if (exact) return exact;

  return User.findOne({
    $expr: {
      $eq: [{ $toLower: { $trim: { input: '$email' } } }, normalized]
    }
  }).select(selection);
};
