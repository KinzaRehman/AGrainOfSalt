// Opens the MongoDB connection using MONGO_URI from the server environment.
const mongoose = require('mongoose');

function connectDB() {
  return mongoose.connect(process.env.MONGO_URI);
}

module.exports = connectDB;