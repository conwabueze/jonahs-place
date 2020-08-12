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
    res.status(400).json({
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
    console.log(err);
    res.status(400).json({
      status: 'fail',
      message: 'something went wrong',
    });
  }
};
