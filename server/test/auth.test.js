// Tests authentication with simulated database methods and email delivery. These tests do not connect to the real database.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const mail = require('../services/passwordResetEmail');
let sentUrl;
mail.sendPasswordReset = async (email, url) => { sentUrl = url; };
const auth = require('../controllers/authController');
function response() {
  return { statusCode: 200, status(code) { this.statusCode = code; return this; },
    json(body) { this.body = body; return this; }, cookie() {}, clearCookie() {} };
}

test('signup, login, recovery, one-time reset, and new password login', async () => {
  process.env.JWT_SECRET = 'test-only-secret';
  let account;
  // Replace database calls with an in-memory account so no real users are changed.
  User.create = async data => { account = { ...data, _id: 'test-user', sessionVersion: 0 }; return account; };
  User.findOne = query => {
    const found = account && (query.$or || query.email === account.email || (query.$expr && query.$expr.$eq[1] === account.email.trim().toLowerCase())) ? account : null;
    const result = Promise.resolve(found);
    result.select = async () => found;
    return result;
  };
  User.updateOne = async (query, update) => { Object.assign(account, update.$set); };
  User.findOneAndUpdate = async (query, update) => {
    if (account.passwordResetToken !== query.passwordResetToken || account.passwordResetExpires <= query.passwordResetExpires.$gt) return null;
    Object.assign(account, update.$set);
    delete account.passwordResetToken;
    delete account.passwordResetExpires;
    account.sessionVersion++;
    return account;
  };
  let res = response();
  await auth.signup({ body: { username: 'Salt', email: ' SALT@example.com ', password: 'old-password' } }, res);
  assert.equal(res.statusCode, 201);
  assert.equal(account.email, 'salt@example.com');
  assert.notEqual(account.password, 'old-password');
  res = response();
  await auth.login({ body: { email: account.email, password: 'wrong-password' } }, res);
  assert.equal(res.statusCode, 401);
  account.email = ' SALT@EXAMPLE.COM ';
  res = response();
  await auth.login({ body: { email: 'salt@example.com', password: 'old-password' } }, res);
  assert.equal(res.statusCode, 200);
  account.password = 'legacy-unsupported-format';
  res = response();
  await auth.login({ body: { email: 'salt@example.com', password: 'old-password' } }, res);
  assert.equal(res.statusCode, 401);
  assert.match(res.body.message, /reset your password/);
  res = response();
  await auth.forgotPassword({ body: { email: 'salt@example.com' } }, res);
  assert.equal(res.statusCode, 200);
  const genericMessage = res.body.message;
  const token = new URL(sentUrl).searchParams.get('token');
  assert.equal(account.passwordResetToken, crypto.createHash('sha256').update(token).digest('hex'));
  assert.notEqual(account.passwordResetToken, token);
  res = response();
  await auth.forgotPassword({ body: { email: 'unknown@example.com' } }, res);
  assert.equal(res.body.message, genericMessage);
  res = response();
  await auth.resetPassword({ body: { token, password: 'short' } }, res);
  assert.equal(res.statusCode, 400);
  account.passwordResetExpires = new Date(Date.now() - 1000);
  res = response();
  await auth.resetPassword({ body: { token, password: 'new-password' } }, res);
  assert.equal(res.statusCode, 400);
  account.passwordResetExpires = new Date(Date.now() + 60000);
  res = response();
  await auth.resetPassword({ body: { token, password: 'new-password' } }, res);
  assert.equal(res.statusCode, 200);
  assert.equal(account.sessionVersion, 1);
  assert.equal(await bcrypt.compare('new-password', account.password), true);
  res = response();
  await auth.resetPassword({ body: { token, password: 'another-password' } }, res);
  assert.equal(res.statusCode, 400);
  res = response();
  await auth.login({ body: { email: account.email, password: 'old-password' } }, res);
  assert.equal(res.statusCode, 401);
  res = response();
  await auth.login({ body: { email: account.email, password: 'new-password' } }, res);
  assert.equal(res.statusCode, 200);
  assert.equal(res.body.user.email, account.email);
});
