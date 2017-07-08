require('dotenv').config();
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//change name after we change the placeholder.js
var db = require('./db/config');
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);

var store = new MongoDBStore({
  uri: db.mongooseURI,
  collection: 'sessions'
});

// Error handling
store.on('error', function(error) {
  assert.ifError(error);
  assert.ok(false);
  console.errror(error);
});

// see end of routes.js for description
var specialHashRegex = '/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

app.use(require('./routes'));

var port = process.env.PORT || 8088;
app.listen(port);
console.log('server running on port ', port);
