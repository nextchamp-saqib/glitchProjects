// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var Bing = require('node-bing-api')({ accKey: "f5b4ce1d379e48d7aa5519da4d3f76ea" });

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.
// mongoose.connect('mongodb://127.0.0.1:27017/image');
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

var uri = "mongodb://thefalconx33:falconx33@freedb-shard-00-00-m2zez.mongodb.net:27017/search?ssl=true&replicaSet=FreeDB-shard-0&authSource=admin";
// MongoClient.connect(uri, function(err, db) {
//   console.log('connected');
// });
mongoose.connect(uri);

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

var history = new mongoose.Schema({query: String, time: String});
var History = mongoose.model('History', history);

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/api/images/:string', function(req, res){
  History.create({
    query: req.params.string,
    time: new Date()
  },function(err, data){
    // console.log(data);
  })
  var data = [];
  Bing.images(req.params.string, {
  count: 10,
  offset: req.query.offset || 0 
  }, function(error, resp, body){
    body.value.forEach(function(item){
      data.push({
        alt_text: item.name,
        image_url: item.contentUrl,
        page_url: item.hostPageUrl
      })
    })
    res.send(data);
  });
});

app.get('/api/history',function(req, res){
  var data = History.find({},'query time',{
    limit: 10,
    sort: {
      time: -1
    }
  },function(err, data){
    res.send(data);
  });
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
