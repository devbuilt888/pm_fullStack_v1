var express = require("express");
var router = express.Router();
var signup = require("./controllers/user.controller").signup;
var getHostedToken = require("./controllers/user.controller").getHostedToken;
var getUser = require("./controllers/user.controller").getUser;
var order = require("./controllers/user.controller").order;

// var getAnAcceptPaymentPage = require("./authorize");
var acceptPaymentPage = require("./authorize");
var paymentId;

router.post('/users/signup', signup);
router.post('/users/order', order);
router.get('/users/token', getHostedToken);
router.get('/users/:id', getUser);

module.exports = router;