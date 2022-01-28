const express = require('express');
const axios = require('axios')
var router = express.Router();

//returns a json
async function getCommits(){
    return await axios.get("https://api.github.com/repos/ricedaddy321/deploy-portfolio-app/commits")
    .then(function(response) {
        //we assume that everything works fine
        let author = [];
        let message = [];
        let date =[];
        let sha = [];
        let link = [];
        //the reponse is an array so we need to iterate through each
        for (const [index, element] of response.data.entries()) {
            author.push(element.commit.author.name);
            message.push(element.commit.message);
            date.push(element.commit.author.date);
            sha.push(element.sha);
            link.push(element.html_url);
        };
        
        var json_data = {"author": author
        , "message": message
        , "date": date
        , "sha": sha 
        , "link": link};
        console.log(json_data.sha);
        return JSON.stringify(json_data);
    });
}

router.get(['/', '/home'], function (req, res) {
    //get all of the json_data
    getCommits().then(function(json_data_response) {
        
        res.render('homePage', JSON.parse(json_data_response));
    }).catch(function(err) {
        res.render('homePage');
    });
    
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