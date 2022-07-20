const User = require('../models/user');

//creating our auth private middleware
let authenticate = (req, res, next) => {
  let headerToken = req.header('Authorization');
  let cookieToken = req.cookies['AuthToken'];
  let token = headerToken || cookieToken;

  //custom model method
  User.findByToken(token)
    .then((user) => {
      req.user = user;
      req.token = token;
      next();
    })
    .catch((e) => {
      res.status(401).json({
        message: 'User is not logged in',
      });
    });
};

module.exports = authenticate;
