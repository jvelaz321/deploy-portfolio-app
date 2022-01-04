const express = require('express');
const axios = require('axios');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('./dogapi/dogLandingPage', { title: 'Express' });
});

//get that random image from axios

/* GET random page. */
router.get('/random', function(req, res) {
  axios.get("https://api.thedogapi.com/v1/images/search")
  .then(function (response) {
    res.render('./dogapi/dogRandom', {data : JSON.stringify(response.data), raw : response.data});
  });
});

/* GET independent page. */
router.get('/independent', function(req, res) {
  axios.get("https://api.thedogapi.com/v1/images/search")
  .then(function (response) {
    res.render('./dogapi/dogIndependent', {data : JSON.stringify(response.data), raw : response.data});
  });
});

module.exports = router;
