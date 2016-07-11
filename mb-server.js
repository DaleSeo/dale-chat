var http = require('http');

var util = require('util');
var querystring = require('querystring');

exports.server = http.createServer((req, res) => {
  if (req.method == 'POST' && req.url == '/messages/create.json') {
    var message = '';
    req.on('data', function(data, msg) {
      var msgData = data.toString('utf-8')
      console.log(msgData);
      message = exports.addMessage(msgData);
    });
    req.on('end', function() {
      console.log('message', util.inspect(message, true, null));
      console.log('messages : ', util.inspect(messages, true, null));
      res.writeHead(200, {'Content-type':'text/plain'});
      res.end(message);
    });
  } else if (req.method == 'GET' && req.url == '/messages/list.json') {
      var body = exports.getMessages();
      res.writeHead(200, {
        'Content-length': body.length,
        'Content-type': 'text/plain'
      });
      res.end(body);
  } else {
    res.writeHead(200, {'Content-type':'text/plain'});
    res.end('Hello World\n');
  };
  console.log(req.method);
}).listen(process.env.PORT || 1337);

console.log('Server running at http://127.0.0.1:1337/');

exports.getMessages = function() {
  return JSON.stringify(messages);
};

exports.addMessage = function(data) {
  var message = querystring.parse(data);
  messages.push(message);
  return JSON.stringify(message);
};

var messages = [];

messages.push({"name":"John","message":"hi"});
