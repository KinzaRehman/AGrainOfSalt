// Local terminal helper: asks for an email and requests a reset link without using the website.
require('dotenv').config({ path: require('node:path').join(__dirname, '../.env'), quiet: true });
const readline = require('node:readline/promises');
const mongoose = require('mongoose');
const { forgotPassword } = require('../controllers/authController');

async function main() {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Use the website password recovery page in production.');
  }
  const prompt = readline.createInterface({ input: process.stdin, output: process.stdout });
  let email;
  try {
    email = await prompt.question('Account email: ');
  } finally {
    prompt.close();
  }
  try {
    await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 10000 });
    await forgotPassword({ body: { email } }, {
      status() { return this; },
      json(data) { console.log(data.message); }
    });
  } finally {
    await mongoose.disconnect();
  }
}

main().catch(() => {
  console.error('Could not request the reset link. Check your database connection and server/.env settings.');
  process.exitCode = 1;
});
