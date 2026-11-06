// One-time account migration: copies old nested credentials into current fields and replaces the legacy index. Password hashes are preserved.
require('dotenv').config({ path: require('node:path').join(__dirname, '../.env'), quiet: true });
const mongoose = require('mongoose');

async function migrate() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const users = mongoose.connection.collection('users');
    const accounts = await users.find({}).toArray();
    const emails = new Set();
    const usernames = new Set();
    // Validate every account first so missing fields or duplicates stop the migration before writes.
    const changes = accounts.map(account => {
      const email = (account.email || account.local?.email || '').trim().toLowerCase();
      const password = account.password || account.local?.password;
      const username = account.username || `salt-${account._id.toString()}`;
      if (!email || !password) throw new Error('An account is missing an email or password. No migration applied.');
      if (emails.has(email) || usernames.has(username)) throw new Error('Duplicate accounts require review. No migration applied.');
      emails.add(email);
      usernames.add(username);
      return { updateOne: { filter: { _id: account._id }, update: { $set: {
        email, username, password,
        sessionVersion: account.sessionVersion || 0,
        motivation: account.motivation || ''
      } } } };
    });
    if (changes.length) await users.bulkWrite(changes);
    await users.createIndex({ email: 1 }, { unique: true });
    await users.createIndex({ username: 1 }, { unique: true });
    const indexes = await users.indexes();
    const legacy = indexes.find(index => index.unique && index.key['local.email'] === 1);
    if (legacy) await users.dropIndex(legacy.name);
    console.log(`Migrated ${changes.length} accounts. Existing password hashes and legacy fields preserved. Current email and username indexes installed.`);
  } finally {
    await mongoose.disconnect();
  }
}

migrate().catch(error => { console.error(error.message); process.exitCode = 1; });
