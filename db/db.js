
const mongoose = require('mongoose');
require('dotenv').config();


const DB_URL = process.env.MONGO_URI;

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,

});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = db;
