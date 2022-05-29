require("dotenv").config({path:__dirname + '/sample.env'});

require("../config/connectDB").connect();
const route = require('express').Router();
const bodyParser = require('body-parser');
const validUrl = require('valid-url');
const shortid = require('shortid');
const Url = require("../model/url");
route.post('/',async (req,res)=>{
    try{
        // Get url input
        const { url } = req.body;

        // Validate url input
        if (!validUrl.isUri(url)) {
          return res.status(409).json({error: 'invalid url'});
        }

        // check if url already exist
        // Validate if url exist in our database
        const oldUrl = await Url.findOne({ original_url: url });
        if (oldUrl) {
            return res.status(409).send("Url Already Exist. Please Try Again");
          }
        //generate a short_url using shortid library
        const urlCode = shortid.generate();
        // Create url in our database
        const user = await Url.create({
            original_url: url,
            short_url : urlCode 
          });
          // Retrieve All url from our Database
          const allUrl = await Url.find();
          res.status(201).json(allUrl);
    }catch(error){
        console.error(error);
        process.exit(1);
    }

});

route.get('/:short_url', async (req,res)=>{
    const shortUrl = req.params.short_url;
    try{
        const urlExist = await Url.findOne({ short_url: shortUrl });
        if (!(urlExist)) {
            return res.status(409).send("Short Url Does Not Exist. Please Try Again");
        }else{
            return res.redirect(urlExist.original_url);
        }
    }catch(error){
        console.error(error);
        process.exit(1);
    }
});

module.exports = route;
