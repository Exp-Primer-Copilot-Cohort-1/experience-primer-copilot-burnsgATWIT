// create web server
var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');

// create a web server
http.createServer(function(req, res) {
  var pathname = url.parse(req.url).pathname;
  var filepath = path.join(__dirname, pathname);
  console.log('pathname: ', pathname);
  console.log('filepath: ', filepath);
  fs.exists(filepath, function(exists) {
    if (exists) {
      fs.readFile(filepath, function(err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      });
    } else {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('404 Not Found');
    }
  });
}).listen(3000, function() {
  console.log('Server is listening on port 3000');
});

// create a web server using express
var express = require('express');
var app = express();
app.use(express.static(__dirname));
app.listen(3001, function() {
  console.log('Server is listening on port 3001');
});