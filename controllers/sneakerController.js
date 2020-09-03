const Sneaker = require('../models/sneakerModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');

//Get all sneakers
exports.getAllSneakers = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Sneaker.find(), req.query)
    .filter()
    .limitFields()
    .sort()
    .paginate();
  const sneakers = await features.query;

  res.status(200).json({
    status: 'success',
    results: sneakers.length,
    data: {
      sneakers,
    },
  });
});

//create Sneaker
exports.createSneaker = catchAsync(async (req, res, next) => {
  const newSneaker = await Sneaker.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      sneaker: newSneaker,
    },
  });
});

//get sneaker
exports.getSneaker = catchAsync(async (req, res, next) => {
  const sneaker = await Sneaker.findById(req.params.id).populate('reviews');

  res.status(200).json({
    status: 'success',
    data: {
      sneaker,
    },
  });
});

//update sneaker
exports.updateSneaker = catchAsync(async (req, res, next) => {
  //third param is needed to make sure that the update sneaker is return rather than the old one
  const sneaker = await Sneaker.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      sneaker,
    },
  });
});

//delete sneaker
exports.deleteSneaker = catchAsync(async (req, res, next) => {
  await Sneaker.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: 'success',
    data: null,
  });
});

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
