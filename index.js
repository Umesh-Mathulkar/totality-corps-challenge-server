const express = require('express');
const passport = require('passport');
const session = require('express-session');
const authRoutes = require('./routes/authRoutes');
const bodyParser = require('body-parser');
const db = require('./db/db'); 
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cartRoutes = require('./routes/cartRoutes')
require('./config/passport');
const cors = require('cors');



const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use Helmet to set secure HTTP headers
app.use(helmet());

// Set up rate limiting to prevent brute-force attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10000, // limit each IP to 100 requests per windowMs
});
app.use(limiter);




// Set up session management
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
}));

// Set up Passport for authentication
app.use(passport.initialize());
app.use(passport.session());


app.get('/', (req, res) => {
  res.send('Welcome to eStore!'); 
});


// Set up routes
// app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/cart',cartRoutes)

// Start the server
app.listen(8080, () => {
  console.log('Server listening on port 8080');
});
