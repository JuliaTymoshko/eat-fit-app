const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/db');
const jwt = require('jsonwebtoken');

const UserScheme = mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  charachteristics: {
    chest: {
      type: Number,
      required: false,
      default: 90,
    },
    waist: {
      type: Number,
      required: false,
      default: 60,
    },
    hips: {
      type: Number,
      required: false,
      default: 90,
    },
  },
  active: {
    type: Boolean,
    required: true,
    default: true,
  },
  tokens: [
    {
      access: {
        type: String,
        required: true,
      },
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

UserScheme.methods.generateToken = function (callback) {
  let user = this;
  let token = jwt.sign(user._id.toHexString(), config.secret);

  let newAuthToken = {
    access: 'auth',
    token: token,
  };

  user.tokens.push(newAuthToken);

  user.save(function (err, user) {
    if (typeof callback !== 'function') return;
    if (err) return callback(err);
    callback(null, user);
  });

  return token;
};

UserScheme.statics.findByToken = function (token) {
  let User = this;
  let decodedID;

  try {
    decodedID = jwt.verify(token, config.secret);
  } catch (e) {
    return Promise.reject({
      status: 'INVALID_TOKEN',
      message: 'Cannot decode token',
    });
  }

  return User.findOne({
    _id: decodedID,
    'tokens.token': token,
    'tokens.access': 'auth',
  });
};

const User = (module.exports = mongoose.model('users', UserScheme));

module.exports.addUser = (newUser, callback) => {
  bcrypt.genSalt(10, (error, salt) => {
    if (error) throw error;

    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};

module.exports.comparePass = (passFromUser, passFromDB, callback) => {
  bcrypt.compare(passFromUser, passFromDB, (error, isMatch) => {
    if (error) throw error;
    callback(null, isMatch);
  });
};
