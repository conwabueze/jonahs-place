const Sneaker = require('../models/sneakerModel');
const APIFeatures = require('../utils/apiFeatures');

//Get all sneakers
exports.getAllSneakers = async (req, res) => {
  try {
    // ///pagination
    // const page = req.query.page * 1 || 1;
    // const limit = req.query.limit * 1 || 100;
    // const skip = (page - 1) * limit;

    // query = query.skip(skip).limit(limit);

    // if (req.query.page) {
    //   const numSneakers = await Sneaker.countDocuments();
    //   if (skip >= numSneakers) throw new Error('This page does not exist');
    // }

    const features = new APIFeatures(Sneaker.find(), req.query)
      .filter()
      .limitFields()
      .sort()
      .paginate();
    const sneakers = await features.query;
    // const sneakers = await query;

    res.status(200).json({
      status: 'success',
      data: {
        sneakers,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: 'fail',
      message: 'something went wrong',
    });
  }
};

//create Sneaker
exports.createSneaker = async (req, res) => {
  try {
    const newSneaker = await Sneaker.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        sneaker: newSneaker,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'something went wrong',
    });
  }
};

//get sneaker
exports.getSneaker = async (req, res) => {
  try {
    const sneaker = await Sneaker.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        sneaker,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'something went wrong',
    });
  }
};

//update sneaker
exports.updateSneaker = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'something went wrong',
    });
  }
};

//delete sneaker
exports.deleteSneaker = async (req, res) => {
  try {
    await Sneaker.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'something went wrong',
    });
  }
};

//get sneakers realeased in particular year
exports.sneakersReleasedIn = async (req, res) => {
  try {
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
      data: {
        sneakers,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'something went wrong',
    });
  }
};

exports.sneakerAverages = async (req, res) => {
  try {
    const sneakerAvgs = await Sneaker.aggregate([
      {
        $group: {
          _id: '$type',
          sneakerAvg: { $avg: '$price' },
        },
      },
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        sneakerAvgs,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'something went wrong',
    });
  }
};
