const express = require('express');
const morgan = require('morgan');

//routers
const sneakerRouter = require('./routes/sneakerRoutes');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/sneakers', sneakerRouter);

module.exports = app;
