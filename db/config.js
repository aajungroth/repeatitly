var mongoose = require('mongoose');


//mongooseURI = 'mongodb://localhost/flashcardsdb';
exports.mongooseURI = process.env.MONGODB_URI
mongoose.connect(exports.mongooseURI);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection err'));

db.once('open', function() {
  console.log('Mongodb connection is open');
});
