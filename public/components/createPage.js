angular.module('flash-card')
.controller('CreatePageCtrl', function($http, $location){
  var currentUser = localStorage.getItem('currentUser');
  this.newDeck = {username: currentUser};
  this.newDeck.cards = [];
  this.newCard = {plaintextFront: true, plaintextBack: true, status: false};


  this.addCard = function(newCard) {
    if(!newCard.front || !newCard.back) {
      alert("Please fill out a card");
    } else {
      this.newDeck.cards.push(newCard);
      console.log('newCard: ', newCard);
      this.newCard = {plaintextFront: true, plaintextBack: true, status: false};
      $('#createQuestionField').focus();
    }
  };

  this.handleSave = function() {
    if(!this.newDeck.deckname) {
      alert("Please enter a deck name");
    } else {
      console.log('NEW DECK', this.newDeck);
      // post goes back to with user info
      $http.post('/decks?username=' + localStorage.getItem('currentUser'), this.newDeck).then(function() {
        $http.get('/decks', {params: {username: localStorage.getItem('currentUser')}}).then(function(response) {
          localStorage.setItem('decks', JSON.stringify(response.data));
          console.log('response.data: ', response.data);
          $location.path('/app');
        }, function(err) {console.error('handleSave, CREATE', err);});
      });
    }
  };

  this.deleteCard = function(card) {
    if (confirm('Are you sure you want to delete this card?')) {
      var i = this.newDeck.cards.indexOf(card);
      this.newDeck.cards.splice(i,1);
    }
  };

  this.moveUp = function(card) {
    var index = this.newDeck.cards.indexOf(card);
    if(index === 0) {
      return;
    } else {
      var temp = this.newDeck.cards[index - 1];
      this.newDeck.cards[index - 1] = this.newDeck.cards[index];
      this.newDeck.cards[index] = temp;
    }
  };

  this.moveDown = function(card) {
    var index = this.newDeck.cards.indexOf(card);
    if(index === this.newDeck.cards.length-1) {
      return;
    } else {
      var temp = this.newDeck.cards[index + 1];
      this.newDeck.cards[index + 1] = this.newDeck.cards[index];
      this.newDeck.cards[index] = temp;
    }
  };

  this.toggleHighlightFront = function(card) {
    card.plaintextFront = !card.plaintextFront;
  };

  this.toggleHighlightBack = function(card) {
    card.plaintextBack = !card.plaintextBack;
  };

})
.component('createPage', {
  controller: 'CreatePageCtrl',
  templateUrl: './templates/createPage.html' //calling from index.html
});
