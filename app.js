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

// #########################################
//  ROUTES
// #########################################

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
