const express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('homePage');
    console.log('Home paged accessed by: TK'); //debugging
});

//send the router
module.exports = router;