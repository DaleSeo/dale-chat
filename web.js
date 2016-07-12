var http = require('http');
var util = require('util');
var querystring = require('querystring');
var mongo = require('mongodb').MongoClient;

var host = 'mongodb://localhost:27017/chat';

mongo.connect(host, function(error, db) {
  if (error) throw error;
  var collection = db.collection('messags');
  var app = http.createServer(function(req, res) {
    if (req.method == 'GET' && req.url == '/messages/list.json') {
        collection.find().toArray(function(error, results) {
          res.writeHead(200, {'Content-type':'text/plain'});
          console.dir(results);
          res.end(JSON.stringify(results));
        });
    }
    if (req.method == 'POST' && req.url == '/messages/create.json') {
      var message = '';
      req.on('data', function(data) {
        collection.insert(querystring.parse(data.toString('utf-8')), {safe:true}, function(error, obj) {
          if (error) throw error;
          res.end(JSON.stringify(obj));
        });
      });
    }
  });
  app.listen(3000);
})
