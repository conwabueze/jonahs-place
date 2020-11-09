const catchAsync = require('../utils/catchAsync');
const Sneaker = require('../models/sneakerModel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const ObjectID = require('mongodb').ObjectID;

exports.getSneakerDirectory = catchAsync(async (req, res, next) => {
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

  res.render('sneakersOverview', {
    sneakers,
    totalSneakers,
    models: sneakerTypes[0].brandTypes.sort(),
    brand,
    sneakerSizes,
    pageNumber,
  });
});

exports.getSneaker = catchAsync(async (req, res, next) => {
  const sneakerId = req.params.sneakerId;

  if (!ObjectID.isValid(sneakerId)) {
    next(new AppError('There is no sneaker with that name'), 404);
  }

  const sneaker = await Sneaker.findById(sneakerId);

  if (!sneaker) {
    next(new AppError('There is no sneaker with that name'), 404);
  }

  const sneakerRecommendations = await Sneaker.aggregate([
    {
      $match: { brand: sneaker.brand, _id: { $ne: sneaker._id } },
    },
    {
      $sample: { size: 8 },
    },
  ]);

  res.render('sneaker', {
    sneaker,
    sneakerRecommendations,
    url: req.url,
  });
});

exports.addToCart = catchAsync(async (req, res, next) => {
  //figure out how to get user then push array into user cart field
  const sneakerID = req.url.split('/')[req.url.split('/').length - 1];
  const cartEntry = [ObjectID(sneakerID), req.body.size];
  // const sneaker = await Sneaker.findByIdAndUpdate(
  //   { sneakerID },
  //   { $push: { ccartEntry } }
  // );
});

exports.getHome = (req, res) => {
  res.status(200).render('home');
};

exports.getLogin = (req, res) => {
  res.status(200).render('login');
};

exports.getAccount = (req, res) => {
  res.status(200).render('account');
};
