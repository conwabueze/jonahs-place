const express = require('express');
const morgan = require('morgan');

//routers
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const sneakerRouter = require('./routes/sneakerRoutes');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use('/api/v1/sneakers', sneakerRouter);

//middleware for unhandled routes
app.all('*', (req,res,next)=>{
  // const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  // err.status = 'fail';
  // err.statusCode = 404;

  next(new AppError(`Can't find ${req.originalUrl} on this server!`,404));
});

app.use(globalErrorHandler);

module.exports = app;
