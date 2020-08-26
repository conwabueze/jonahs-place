const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name'],
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide your email'],
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      //this keyword only works on CREATE and SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!',
    },
  },
  passwordChangedAt: {
    type: Date,
  },
  role: {
    type: String,
    enum: ['admin', 'customer'],
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
});

//instance method for checking if user password was changed anytime after token was issued
userSchema.methods.changedPasswordAfter = function (JWTtimestamp) {
  if (this.passwordChangedAt) {
    const convertedTime = parseInt(this.passwordChangedAt.getTime() / 1000, 10);

    //if JWTtimestamp is great then convertedTime that means that the user did not change their password since recieving their current token. (False === it did not change)
    return JWTtimestamp < convertedTime;
  }

  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  //1) Create token ... 32 === bit size
  const resetToken = crypto.randomBytes(32).toString('hex');

  //2) encrypt token, set it in schema and provide expiration (set expiration to 10 mins after the current time)
  this.passwordResetToken = crypto
    .createHash('sha256') //sha256 algorithm
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  //3) Return plain text to provide in email to user
  return resetToken;
};

userSchema.pre('save', async function (next) {
  //only run this function if password was actually modified if not just pass it along to the next middleware with next
  if (!this.isModified('password')) return next();

  //hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12); //cost determines how cpu intensive the salting should be

  //after we salt and hash the password we need to delete the poasswordConfirm field before it is persisted to the database
  //we do this by setting it to undefined
  //we only need the passwordConfirm to validate the password at this point that the  job is already done
  //even though we set the passwordConfirm to required, required means that the field is required not that it has to be persisted to the database
  this.passwordConfirm = undefined;

  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
