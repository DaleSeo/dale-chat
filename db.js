var util = require('util');
var mongodb = require('mongodb');

var Db = mongodb.Db;
var Connection = mongodb.Connection;
var Server = mongodb.Server;
var host = 'ec2-52-78-37-210.ap-northeast-2.compute.amazonaws.com';
var port = '27017';

var db = new Db('test', new Server(host, port, {}));
db.open(function(e, c) {
  console.log(db._state);
  // console.log(util.inspect(db));
  db.close();
});
