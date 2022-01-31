const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();
// Middleware required to receive post data.
//
// It needs to come BEFORE the routes, if not, it'll not execute.
// That's why this "global" middleware is usually written BEFORE all route handlers.
app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const port = 3000;

// #########################################
//  ROUTES
// #########################################

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// #########################################
// START LISTENING FOR INCOMING REQUESTS
// #########################################

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

// #########################################
