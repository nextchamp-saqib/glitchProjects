// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

var urls = [];

app.get("/short/:url(*)",function(req, res){
  var url = req.params.url;
  if(url.match(/https?:\/\/[A-z0-9]+\.[a-z]+/)){
    urls.push({
      orignal_url: url,
      short_url: 'https://fccurlshortner.glitch.me/' + Math.floor(Math.random()*10000)
    });
    // res.send(typeof(urls[urls.length-1]).short_url);
    res.send(urls[urls.length-1]);
  }
  res.send({
    url: 'invalid'
  })
})

app.get('/urls', function(req, res){
  res.send(urls);
})

app.get("/:number", function(req, res){
  var number = req.params.number;
  urls.forEach(function(obj){
    var s = obj.short_url;
    if(s.includes(number))
      res.redirect(obj.orignal_url);
  })
  res.send('Enter valid url');
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
