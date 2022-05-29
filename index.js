require('dotenv').config({path: './sample.env'});
const express = require('express');
const cors = require('cors');
require("./config/connectDB").connect();
const urlApi = require('./Api/url_shortner');

const bodyParser = require('body-parser');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.use('/api/shorturl', urlApi);
app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
