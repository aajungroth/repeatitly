var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = require('../config');

var CardSchema = new Schema({
  front: String,
  back: String,
  status: {
    type: Boolean,
    default: false
  },
  // progress: Number,
  // age: Number,
  // effort: Number,
  plaintextFront: {
    type: Boolean,
    default: true
  },
  plaintextBack: {
    type: Boolean,
    default: true
  },
  lang: {
    type: String,
    default: 'Javascript'
  }
});

var Card = mongoose.model('Card', CardSchema);

module.exports = {
  Card: Card,
  CardSchema: CardSchema
};
