const express = require('express');
const passport = require('passport');
const session = require('express-session');
const authRoutes = require('./routes/authRoutes');
const cartRoutes = require('./routes/cartRoutes');
const db = require('./db/db');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const morgan = require('morgan');
require('./config/passport');
const cors = require('cors');
const MongoStore = require('connect-mongo');
require('dotenv').config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(morgan('combined'));

// Use Helmet to set secure HTTP headers
app.use(helmet());

// Set up rate limiting to prevent brute-force attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10000, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Set up session management with connect-mongo
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  })
);

// Set up Passport for authentication
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('Welcome to eStore!');
});

// Set up routes
app.use('/auth', authRoutes);
app.use('/cart', cartRoutes);

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
