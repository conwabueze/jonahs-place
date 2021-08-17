const AppError = require('../utils/appError');

//Error response for development mode
const sendDevError = (err, req, res) => {
  // A) API
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
  //B) RENDERED PAGE
  console.error('ERROR ', err);
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: err.message,
  });
};

//Error response for production mode
const sendProdError = (err, req, res) => {
  // A) API
  if (req.originalUrl.startsWith('/api')) {
    //Operational, trusted error: send message to client
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
    //Programming or other unknown error: dont leak details to client

    //1) Log error
    console.error('ERROR ', err);

    //2) Send generic message
    return res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }
  // B) RENDERED PAGE

  //Operational, trusted error: send page to client
  if (err.isOperational) {
    return res.status(err.statusCode).render('error', {
      title: 'Something went wrong!',
      msg: err.message,
    });
  }
  //Programming or other unknown error: dont leak details to client

  //1) Log error
  console.error('ERROR ', err);

  //2) Send generic message
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: 'Please try again later.',
  });
};

//Handle CastError method
const handleCastErrors = (err) => {
  const message = `Invalid ${err.path}: ${err.stringValue}.`;
  return new AppError(message, 400);
};

//Handle Duplicate Key Error method
const handleDuplicateKeyErrors = (err) => {
  const message = `Duplicate field value: ${
    err.keyValue[Object.keys(err.keyValue)[0]]
  }. Please use another ${Object.keys(err.keyValue)[0]}`;
  return new AppError(message, 500);
};

//Handle Validation Error method
const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

//Handle JsonWebTokenError method
const handleJsonWebTokenError = () =>
  new AppError('Invalid token. Please login again', 401);

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'status';

  if (process.env.NODE_ENV === 'development') {
    sendDevError(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let errCopy = { ...err };

    //when destructing the err object into errCopy the message property is not copied
    //This is to add back on the message none of the conditions (if statements) are meet
    errCopy.message = err.message;

    //handle CastErrors
    if (errCopy.kind === 'ObjectId') errCopy = handleCastErrors(errCopy);

    //handling duplicate key error
    if (errCopy.code === 11000) errCopy = handleDuplicateKeyErrors(errCopy);

    //handling validation errors
    if (err.stack.includes('ValidationError'))
      errCopy = handleValidationError(errCopy);

    //Json Web token error
    if (errCopy.name === 'JsonWebTokenError')
      errCopy = handleJsonWebTokenError();

    sendProdError(errCopy, req, res);
  }
};
