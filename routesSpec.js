require('dotenv').config();
var request = require('supertest');
var express = require('express');
var expect = require('chai').expect;
var routes = require('./routes.js');
// var mongoose = require('mongoose');
var db = require('./db/config.js');
// var dbURI = require('./db/config.js');
var User = require('./db/models/user.js');
var Deck = require('./db/models/deck.js');
var Card = require('./db/models/card.js');

// var db = mongoose.createConnection(dbURI.mongooseURI, {
//   "useMongoClient": true
// });

describe('Routes', function() {

  beforeEach(function(done) {

    done();
  });

  describe('Login', function() {

    beforeEach(function(done) {
      done();
    });

    it('should something', function(done) {
      expect(1).to.equal(1);
      done();
    });

    it('should something', function(done) {

      done();
    });

  });

  // describe('SignUp', function() {

  //   beforeEach(function(done) {
  //     done();
  //   });

  // });

  // describe('Logout', function() {

  //   beforeEach(function(done) {
  //     done();
  //   });

  // });

  // describe('Decks', function() {

  //   beforeEach(function(done) {
  //     done();
  //   });

  // });

  // describe('Users', function() {

  //   beforeEach(function(done) {
  //     done();
  //   });

  // });

  // describe('Sessions', function() {

  //   beforeEach(function(done) {
  //     done();
  //   });

  // });

});