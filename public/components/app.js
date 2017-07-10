angular.module('flash-card')
.controller('AppCtrl', function($http, $timeout) {
  var that = this;
  this.currentUser = localStorage.getItem('currentUser');
  this.showSelfDecks = localStorage.getItem('showOwnDecks');
  this.showPublicDecks = localStorage.getItem('showPublicDecks');
  this.duplicateDeck = function(deck) {
    $http.post('/decks/duplicate', {
      deckId: deck._id,
      newUsername: that.currentUser
    }).then(function(res) {
      console.log('receieved response', res, res.status);
      that.updateDecks();
    }, function(error) {
      console.log('error on duplicating deck');
    });

  };
  this.updateDecks = function() {
    localStorage.setItem('showOwnDecks', that.showSelfDecks);
    localStorage.setItem('showPublicDecks', that.showPublicDecks);
    $http.get('/decks', {
        params: {username: this.currentUser,
            showUser: this.showSelfDecks,
            showPublic: this.showPublicDecks
          }
        }).then(function(response) {
          // console.log('then callback of updateDecks',localStorage.getItem('decks'));
          localStorage.setItem('decks', JSON.stringify(response.data));
          // console.log('after set localStorage');
          that.setDecks();
        }, function(error) {console.error(error);});
  };
  this.alert = function() {
    alert('hi');
  };
  this.setDecks = function() {
      that.decks = JSON.parse(localStorage.getItem('decks'));
      console.log('setDecks called. this.decks: ', that.decks);
  };
  this.getDeck = function(deck){
    console.log('deck in app.js: ', deck);
    localStorage.setItem('currentDeck', JSON.stringify(deck));
  };
  this.handleDelete = function(deck) {
  if (confirm('Are you sure you want to delete this deck?')) {
    var id = deck._id;
    $http.delete('/decks/' + id).then(function() {
      that.updateDecks();
    }, function(error) {
      console.error(error);
    });
  }
};
  if (this.currentUser === null) {
    // this is to make the client-side wait for the public decks to arrive before setting this.decks
    console.log('you are not signed in');
    $timeout(function() {that.setDecks();}, 100);
  } else {
    this.setDecks();
  }
})
.component('app', {
  controller: 'AppCtrl',
  templateUrl: './templates/app.html',
});
