const crypto = require('crypto');
const { promisify } = require('util');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Email = require('../utils/email');

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, token, res) => {
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true, //Makes sure the cookie can not be accessed or modified by the browser
  };

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true; //Cookie will only by send under https

  res.cookie('jwt', token, cookieOptions);

  //Remove password from being shown in the output
  user.password = undefined;
  user.passwordChangedAt = undefined;

  return res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const url = '';
  await new Email(newUser, url).sendWelcome();

  //assign token to new created user
  const token = signToken(newUser._id);

  //return created User and token
  createSendToken(newUser, 201, token, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //1)Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  //2) Check if user exists && password is correct
  //the select function allows us to select particular fields that we want
  //in this case we want the password which is set not to return
  //in order to get fields that are hidden/no returned we add a + in front of it
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  //3) If everything ok,send token to client
  const token = signToken(user._id);
  createSendToken(user, 200, token, res);
});

exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({ status: 'success' });
};

//this middleware function only deals with routes we need protected
exports.protect = catchAsync(async (req, res, next) => {
  //1) Check if there is a token in the request header. If not tell user to login
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError(
        'You are not logged in at the moment...Please log in to proceed.',
        401
      )
    );
  }

  //2) Verify if token is an actual token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //3) Check if the user still exist
  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(new AppError('This user no longer exist...', 401));
  }

  //4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again', 401)
    );
  }

  //5)Grant access to protected route
  req.user = currentUser;
  res.locals.user = currentUser; //give pug template access to current user
  next();
});

//only for rendered pages, no errors
exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      let token = req.cookies.jwt;

      //1) Verify if token is an actual token
      const decoded = await promisify(jwt.verify)(
        token,
        process.env.JWT_SECRET
      );

      //2) Check if the user still exist
      const currentUser = await User.findById(decoded.id);

      if (!currentUser) {
        return next();
      }

      //3) Check if user changed password after the token was issued
      if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next();
      }

      //There is a logged in user
      res.locals.user = currentUser; //give pug template access to current user
      return next();
    } catch (err) {
      return next();
    }
  }

  next();
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perfrom this action'),
        403
      );
    }

    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  //1) Get User
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(
      new AppError('There is no user associated with this email', 404)
    );
  }

  //2) Generate random reset token and save new user data (encryted reset token and its expiration) to the db
  const resetToken = user.createPasswordResetToken();

  //3) Send email to user's email
  try {
    const resetURL = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/users/resetPassword/${resetToken}`;

    await new Email(user, resetURL).sendPasswordReset();

    await user.save({ validateBeforeSave: false }); //validateBeforeSave allows us to save the new user data with out having to also including required user fields

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email',
    });
  } catch (err) {
    return next(new AppError(err), 500);
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const { newPassword, newPasswordConfirm } = req.body;
  //1)Get user that we want to reset password for and make sure that they meet the requirements for doing so
  const resetToken = crypto
    .createHash('sha256') //sha256 algorithm
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: resetToken,
    passwordResetExpires: { $gt: Date.now() }, //if passwordResetExpires is greater than (aka in the future) the time now then the token is valid
  });

  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }

  //2) Upadate password and remove resetToken and expiration date for that user from the db
  user.password = newPassword;
  user.passwordConfirm = newPasswordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  //4) Generate token and sent response to client
  const token = signToken(user._id);
  createSendToken(user, 200, token, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const { currentPassword, newPassword, newPasswordConfirm } = req.body;

  //1) Get User
  const user = await User.findById(req.user._id).select('+password');

  //2) Check if password enter by client is actual password if not throw error
  if (!(await bcrypt.compare(currentPassword, user.password))) {
    return next(new AppError('Incorrect Password', 401));
  }

  //3) Check if new password is equal to confirm password
  if (newPassword !== newPasswordConfirm) {
    return next(
      new AppError('Confirm Password is not equal to new password', 401)
    );
  }
  //4) update password
  user.password = newPassword;
  user.passwordConfirm = newPasswordConfirm;
  await user.save();

  //4) Send success JSON and new token
  const token = signToken(user._id);
  createSendToken(user, 200, token, res);
});

//only for rendered pages, no errors
exports.userLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    let token = req.cookies.jwt;

    //1) Verify if token is an actual token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    //2) Check if the user still exist
    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
      return next(new AppError('No user is logged in', 404));
    }

    //3) Check if user changed password after the token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return next(new AppError('User needs to sign in again', 404));
    }

    //There is a logged in user
    res.locals.user = currentUser; //give pug template access to current user

    res.status(200).json({
      status: 'success',
      message: 'User is logged in',
      data: {
        user: currentUser,
      },
    });
  } else {
    return next(new AppError('User not logged in', 404));
  }
};
