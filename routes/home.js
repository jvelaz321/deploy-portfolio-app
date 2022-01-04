const express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('homePage');
    console.log('Home paged accessed by: TK'); //debugging
});

router.get('/about', function(req, res)
{
    res.render('./header/aboutPage');
    console.log('About page accessed by: TK');
});

router.get('/projects', function(req, res)
{
    res.render('./header/projectsPage');
    console.log('projects page has been accessed');
});

router.get('/contacts', function(req, res)
{
    res.render('./header/contactsPage');
    console.log('contacts page has been accessed');
});

//send the router
module.exports = router;