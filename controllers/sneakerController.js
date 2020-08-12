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
    console.log('Heyy');
    res.status(400).json({
      status: 'fail',
      message: 'something went wrong',
    });
  }
};
