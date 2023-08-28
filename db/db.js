// db.js
const mongoose = require('mongoose');


const DB_URL = 'mongodb+srv://test:L2QLuGui1Pf6GiRy@cluster0.elbrrf2.mongodb.net/totality-corps-challenges?retryWrites=true&w=majority';

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
