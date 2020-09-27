const Sneaker = require('../models/sneakerModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const handlerFactory = require('./handlerFactory');

exports.getSneaker = handlerFactory.getOne(Sneaker, { path: 'reviews' });
exports.getAllSneakers = handlerFactory.getAll(Sneaker);
exports.createSneaker = handlerFactory.createOne(Sneaker);
exports.updateSneaker = handlerFactory.updateOne(Sneaker);
exports.deleteSneaker = handlerFactory.deleteOne(Sneaker);

//get sneakers realeased in particular year
exports.sneakersReleasedIn = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1; // * 1 to convert string to number
  const sneakers = await Sneaker.aggregate([
    {
      $match: {
        dateReleased: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: '$brand',
        total: { $sum: 1 },
        sneakers: { $push: { name: '$name', year: '$dateReleased' } },
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    results: sneakers.length,
    data: {
      sneakers,
    },
  });
});

exports.sneakerAverages = catchAsync(async (req, res, next) => {
  const aggregation = [
    {
      $group: {
        _id: '$type',
        sneakerAvg: { $avg: '$price' },
      },
    },
  ];

  if (req.params.type) {
    aggregation.unshift({
      $match: { type: req.params.type },
    });
  }

  const sneakerAvgs = await Sneaker.aggregate(aggregation);

  res.status(200).json({
    status: 'success',
    results: sneakerAvgs.length,
    data: {
      sneakerAvgs,
    },
  });
});

exports.uniqueSneakerTypes = catchAsync(async (req, res, next) => {});
