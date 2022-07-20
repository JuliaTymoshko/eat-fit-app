const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const config = require('../../config/db');
const mongoose = require('mongoose');
const authenticate = require('../../middleware/authentificate');
const { response } = require('express');

// http://localhost:8080/api/users/registration
router.post('/registration', async (req, res) => {
  try {
    // ? сюда попадает фетч с фронтенда, когда отправляются данные. Это доставание данных из реквеста
    const {
      userName,
      email,
      password,
      weight,
      height,
      chest,
      waist,
      hips,
      active,
    } = req.body;

    let user;

    // ? Поиск по базе данных юзера с соответсвующим эмейлом
    user = await User.findOne({ email: email.toLowerCase() });
    if (user) {
      return res.status(400).json({
        message: 'This email is already being used (hello from backend)',
      });
    }

    if (password.length < 5) {
      return res.status(417).json({
        message: 'Password is too short (hello from backend)',
      });
    }

    user = new User({
      userName,
      email: email.toLowerCase(),
      password,
      weight,
      height,
      charachteristics: { chest: chest, waist: waist, hips: hips },
      active,
    });

    User.addUser(user, (error, user) => {
      let token = user.generateToken();

      if (error) {
        res.status(422).json({
          message: 'Some problems on server',
        });
      } else {
        res.status(201).json({
          message: 'Success :)',
          success: true,
          token,
          user,
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Some problems (hello from backend)',
      error: error,
    });
  }
});

// login - http://localhost:8080/api/users/login
router.post('/login', async (req, res) => {
  try {
    // сюда попадает фетч с фронтенда
    const { email, password } = req.body;
    // check user in DB
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(400).json({
        message: 'No user with such email',
      });
    }

    if (!user.active) {
      return res.status(403).json({
        message: 'Access denied. User is banned',
      });
    }

    User.comparePass(password, user.password, (err, isMatch) => {
      if (err) throw err;

      if (isMatch) {
        res.status(200).json({
          success: true,
          token: user.tokens[0].token,
          user: {
            id: user._id,
            userName: user.userName,
            email: user.email,
            height: user.height,
            weight: user.weight,
            charachteristics: {
              chest: user.charachteristics.chest,
              waist: user.charachteristics.waist,
              hips: user.charachteristics.hips,
            },
          },
        });
      } else {
        return res.status(400).json({
          message: 'Password incorrect',
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Problems with login (hello from backend)',
      error: error,
    });
  }
});

// получение через юз эффект инфы юзера по айди -http://localhost:8080/api/users/62c71238014d397881633b29
router.get('/:id', async (req, res) => {
  try {
    const authorization = req.headers.authorization;
    const id = req.params.id;

    if (!authorization) {
      return res.status(401).json({
        message: 'User is not logged in',
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: 'User not found from mongosose',
      });
    }

    const verifyUser = jwt.verify(authorization, config.secret);

    if (!verifyUser) {
      return res.status(401).json({
        message: 'User is not authorized',
      });
    } else if (id === verifyUser._id) {
      return res.status(403).json({
        message: 'No access rights',
      });
    }

    let user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    if (!user.active) {
      return res.status(403).json({
        message: 'User is banned',
      });
    }

    return res.status(200).json({
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
        height: user.height,
        weight: user.weight,
      },
    });
    //
    //
    //
  } catch (error) {
    res.status(500).json({
      id: _id,
      success: false,
      message: 'Problems with getting user by id',
      error: error,
    });
  }
});

// * we don't need id here - http://localhost:8080/api/users
router.get('/', authenticate, async (req, res) => {
  try {
    let user = req.user;

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    if (!user.active) {
      return res.status(403).json({
        message: 'User is banned',
      });
    }

    return res.status(200).json({
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
        height: user.height,
        weight: user.weight,
        charachteristics: {
          chest: user.charachteristics.chest,
          waist: user.charachteristics.waist,
          hips: user.charachteristics.hips,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      id: _id,
      success: false,
      message: 'Problems with getting user by id',
      error: error,
    });
  }
});

// ? http://localhost:8080/api/users/edit
router.put('/edit', authenticate, async (req, res) => {
  try {
    const { weight, height, chest, waist, hips } = req.body;

    const userId = req.user._id;

    let user = await User.findById(userId);

    if (!user) res.status(404);

    await User.findByIdAndUpdate(userId, {
      weight,
      height,
      charachteristics: {
        chest,
        hips,
        waist,
      },
    });

    const updatedUser = await User.findById(userId);

    res.status(200).json({
      success: true,
      message: 'ураааа',
      data: {
        id: updatedUser._id,
        height: updatedUser.height,
        weight: updatedUser.weight,
        charachteristics: {
          chest: updatedUser.charachteristics.chest,
          waist: updatedUser.charachteristics.waist,
          hips: updatedUser.charachteristics.hips,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Some problems (hello from backend)',
      error: error,
    });
  }
});

module.exports = router;
