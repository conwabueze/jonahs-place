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

exports.getAllSneakersByBrand = catchAsync(async (req, res, next) => {
  const brand = req.params.brand;
  const features = new APIFeatures(Sneaker.find({ brand: brand }), req.query)
    .filter()
    .sizeFilter()
    .priceFilter()
    .sort()
    .paginate();

  //add aggregation pipeline to retrieved Sneakers
  const sneakers = await features.query;

  const featuresTotal = new APIFeatures(
    Sneaker.find({ brand: brand }),
    req.query
  )
    .filter()
    .sizeFilter()
    .priceFilter()
    .totalCount();

  const totalSneakers = await featuresTotal.query;

  //used to get information on the different sneaker types/models a particular brand has
  const sneakerTypes = await Sneaker.aggregate([
    {
      $group: {
        _id: '$brand',
        brandTypes: { $addToSet: '$type' },
      },
    },
    {
      $match: {
        _id: brand,
      },
    },
    {
      $sort: { brandTypes: 1 },
    },
  ]);

  //used to get all size options avaible for all sneakers in a particular brand
  const sneakerSizes = await Sneaker.aggregate([
    {
      $project: {
        name: '$name',
        brand: '$brand',
        sizesAndQuantity: { $objectToArray: '$sizesAndQuantity' },
      },
    },
    {
      $unwind: '$sizesAndQuantity',
    },
    {
      $project: {
        name: '$name',
        brand: '$brand',
        sizes: '$sizesAndQuantity.k',
      },
    },
    {
      $match: { brand: brand },
    },
    {
      $group: {
        //have to convert sizes to decimal in order to sort it later in the pipleline
        _id: { $convert: { input: '$sizes', to: 'decimal' } },
        count: { $sum: 1 },
        sneakers: { $push: { name: '$name' } },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
  ]);

  //page number
  let pageNumber = 1;
  if (req.url.includes('page=')) {
    const pageIndex = req.url.indexOf('page=');
    pageNumber = req.url.substring(pageIndex + 5, pageIndex + 6);
  }

  // res.render('sneakersOverview', {
  //   sneakers,
  //   totalSneakers,
  //   models: sneakerTypes[0].brandTypes.sort(),
  //   brand,
  //   sneakerSizes,
  //   pageNumber,
  // });

  res.status(200).json({
    status: 'success',
    results: sneakers.length,
    data: {
      sneakers,
      totalSneakers,
      sneakerTypes,
      sneakerSizes,
    },
  });
});

exports.getSneakerRecommendations = catchAsync(async (req, res, next) => {
  const sneakerId = req.params.sneakerId;

  if (!ObjectID.isValid(sneakerId)) {
    next(new AppError('There is no sneaker with that name'), 404);
  }

  const sneaker = await Sneaker.findById(sneakerId);

  const sneakerRecommendations = await Sneaker.aggregate([
    {
      $match: { brand: sneaker.brand, _id: { $ne: sneaker._id } },
    },
    {
      $sample: { size: 8 },
    },
  ]);

  res.status(200).json({
    status: 'success',
    results: sneakerRecommendations.length,
    data: {
      sneakerRecommendations,
    },
  });
});
