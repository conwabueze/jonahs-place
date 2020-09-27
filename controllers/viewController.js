const catchAsync = require('../utils/catchAsync');
const Sneaker = require('../models/sneakerModel');
const APIFeatures = require('../utils/apiFeatures');

exports.getSneakerDirectory = catchAsync(async (req, res, next) => {
  console.log(req.query);
  const brand = req.params.brand;
  const features = new APIFeatures(Sneaker.find({ brand: brand }), req.query)
    .filter()
    .sizeFilter()
    .limitFields()
    .sort()
    .paginate();

  const sneakers = await features.query;

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

  res.render('sneakersOverview', {
    sneakers,
    models: sneakerTypes[0].brandTypes.sort(),
    brand,
  });
});

exports.getHome = (req, res) => {
  res.sendFile('index.html');
};
