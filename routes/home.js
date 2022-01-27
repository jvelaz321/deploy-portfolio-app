const express = require('express');
var router = express.Router();

router.get(['/', '/home'], function (req, res) {
    res.render('homePage');
});

router.get('/about', function(req, res)
{
    res.render('./header/aboutPage');
});

router.get('/projects', function(req, res)
{
    res.render('./header/projectsPage');
});

router.get('/contacts', function(req, res)
{
    res.render('./header/contactsPage');
});

//send the router
module.exports = router;