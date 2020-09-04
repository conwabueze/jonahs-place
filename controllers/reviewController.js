const mongoose = require('mongoose');
const catchAsync = require('../utils/catchAsync');
const Review = require('../models/reviewModel');
const handlerFactory = require('./handlerFactory');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.sneakerId) filter = { sneaker: req.params.sneakerId };

  const reviews = await Review.find(filter);

  res.status(201).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;
  if (!req.body.sneaker) req.body.sneaker = req.params.sneakerId;

  const newReview = await Review.create(req.body);

  res.status(200).json({
    status: 'success',
    data: {
      newReview,
    },
  });
});

exports.getReview = handlerFactory.getOne(Review);
