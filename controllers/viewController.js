const catchAsync = require('../utils/catchAsync');
const Sneaker = require('../models/sneakerModel');
const APIFeatures = require('../utils/apiFeatures');

exports.getSneakerDirectory = catchAsync(async (req, res, next) => {
  const brand = req.params.brand;
  const features = new APIFeatures(Sneaker.find({ brand: brand }), req.query)
    .filter()
    .sizeFilter()
    .limitFields()
    .sort()
    .paginate();

  const sneakers = await features.query;

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

  res.render('sneakersOverview', {
    sneakers,
    models: sneakerTypes[0].brandTypes.sort(),
    brand,
    sneakerSizes,
  });
});

exports.getHome = (req, res) => {
  res.sendFile('index.html');
};
