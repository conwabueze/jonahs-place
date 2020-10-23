const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

//routers
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const sneakerRouter = require('./routes/sneakerRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const viewRouter = require('./routes/viewRoutes');

const app = express();

// app.use(function (req, res, next) {
//   res.header(
//     'Access-Control-Allow-Origin',
//     'http://127.0.0.1:8000/api/v1/users/login'
//   ); // update to match the domain you will make the request from
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   );
//   next();
// });

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
//parses cookies from request
app.use(cookieParser());

//set view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views')); //give directory to our views folder

//1) Global Middlewares
//Serving static files
app.use(express.static(path.join(__dirname, 'public')));

//Set security HTTP headers
//app.use(helmet());

//Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000, //1 hour
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

//Body parser,reading data from the body into req.body
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

//Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'name',
      'price',
      'brand',
      'type',
      'color',
      'productCode',
      'gender',
      'size',
    ],
  })
);

app.use('/', viewRouter);

//app.use('/', viewRouter);
app.use('/api/v1/sneakers', sneakerRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

//middleware for unhandled routes
app.all('*', (req, res, next) => {
  // const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  // err.status = 'fail';
  // err.statusCode = 404;

  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
