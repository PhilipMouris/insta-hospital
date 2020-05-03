/* eslint-disable no-console */
// import libraries
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');
const errorHandler = require('./middleware/ErrorHandler');
require('dotenv').config();

// DB
const sequelize = require('./DB');
const populate = require('./development/populate');

// Importing routes
const Accounts = require('./routes/Accounts');
const Conditions = require('./routes/Conditions');
const Users = require('./routes/Users');
const Hospitals = require('./routes/Hospitals');
const Rooms = require('./routes/Rooms');
const Reviews = require('./routes/Reviews');
const Bookings = require('./routes/Bookings');
const Notifications = require('./routes/Notifications');
const Subscribers = require('./routes/Subscribers');

// Models SHOULD BE DELETED AFTER ROUTES.
// require('./models/account.model');
// require('./models/user.model');
// require('./models/booking.model');
// require('./models/condition.model');
// require('./models/hospital.model');
// require('./models/hospitalNotifications.model');
// require('./models/notification.model');
// require('./models/review.model');
// require('./models/userNotifications.model.');
// require('./models/userConditions.model');

const app = express();

// init middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('dev'));
app.use(passport.initialize());
require('./middleware/Passport')(passport);

// DB Connection

sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to postgres');
  })
  .catch(err => {
    console.error('Unable to connect to postgres ', err);
  });

// Routes here
app.use('/api/accounts', Accounts);
app.use('/api/conditions', Conditions);
app.use('/api/users', Users);
app.use('/api/hospitals', Hospitals);
app.use('/api/rooms', Rooms);
app.use('/api/reviews', Reviews);
app.use('/api/notifications', Notifications);
app.use('/api/subscribers', Subscribers);
app.use('/api/bookings', Bookings);

app.use(errorHandler);

// DB Sync
const eraseDatabaseOnSync = false;
sequelize
  .sync({ force: eraseDatabaseOnSync })
  .then(() => {
    if (eraseDatabaseOnSync) populate();
    console.log('Synced models with database');
  })
  .catch(error => console.log('Could not sync models with database', error));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server up and running on ${port}.`));
