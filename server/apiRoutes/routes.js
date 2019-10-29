const router = require('express').Router();
const Users = require('./users')

router.use('./user',require(Users))

router.use(function (req, res, next) {
    const err = new Error('Not found.');
    err.status = 404;
    next(err);
  });

module.exports = router

