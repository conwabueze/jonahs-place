const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const filterObj = (obj, ...allowedFields) => {
  const filteredObj = {};

  Object.keys(obj).forEach((field) => {
    if (allowedFields.includes(field)) {
      filteredObj[field] = obj[field];
    }
  });

  return filteredObj;
};

exports.updateMe = catchAsync(async (req, res, next) => {
  //1) Check if the client passed in any password properties
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'You can not update you password here please use "/updateMyPassword" to do so',
        400
      )
    );
  }

  //2)Filter out req object for properties that the client is allowed to update
  const filteredObj = filterObj(req.body, 'name', 'email');

  //3 Update user
  const updatedUser = await User.findByIdAndUpdate(req.user._id, filteredObj, {
    new: true, //new:true returns the updated object instead of the old one
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  //1) Get user that wants to be deleted and set active to false
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users: users,
    },
  });
});
