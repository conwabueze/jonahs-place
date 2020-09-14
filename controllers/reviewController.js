const mongoose = require('mongoose');
const catchAsync = require('../utils/catchAsync');
const Review = require('../models/reviewModel');
const handlerFactory = require('./handlerFactory');

exports.getAllReviews = handlerFactory.getAll(Review);

exports.checkForSneakerParam = (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;
  if (!req.body.sneaker) req.body.sneaker = req.params.sneakerId;
  next();
};

exports.createReview = handlerFactory.createOne(Review);
exports.getReview = handlerFactory.getOne(Review);
exports.updateReview = handlerFactory.updateOne(Review);
exports.deleteReview = handlerFactory.deleteOne(Review);
