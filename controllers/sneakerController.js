const Sneaker = require('../models/sneakerModel');

//Get all sneakers
exports.getAllSneakers = async (req, res) => {
  try {
    const sneakers = await Sneaker.find();

    res.status(200).json({
      status: 'success',
      data: {
        sneakers,
      },
    });
  } catch (err) {
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
