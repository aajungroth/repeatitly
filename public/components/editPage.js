angular.module('flash-card')
  .controller('EditPageCtrl', function($http, $location){
    var that = this;
    this.newCard = {plaintextFront: true, plaintextBack: true, status: false};
    //***** add more of the default schema ****
    this.deck = JSON.parse(localStorage.getItem('currentDeck'));
    this.currentUser = localStorage.getItem('currentUser');
    this.addCard = function(newCard) {
      if(!newCard.front || !newCard.back) {
        alert("Please fill out a card");
      } else {
        this.deck.cards.push(this.newCard);
        this.newCard = {plaintextFront: true, plaintextBack: true, status: false};
        $('#editQuestionField').focus();
      }
      console.log('this.deck----', this.deck);
    };

    this.handleSave = function() {
      if(!this.deck.deckname) {
        alert("Please enter a deck name");
      } else {
        var id = this.deck._id;
        $http.put('/decks/', this.deck, {params: {username: localStorage.getItem('currentUser')}}).then(function() {
          $http.get('/decks', {params: {username: localStorage.getItem('currentUser')}}).then(function(response) {
            console.log('getting decks', response);
            localStorage.setItem('decks', JSON.stringify(response.data));
            $location.path('/app');
          }, function(err) {console.error('handleSave, EDIT', err);});
        }, function(err) {console.error(err);});
      }
    };

    this.showme = false;

    this.handleEditAndSave = function() {
      if(!this.deck.deckname) {
        alert("Please enter a deck name");
      } else {
        this.showme = true;
        var id = this.deck._id;
        $http.put('/decks/' + id, this.deck)
          .then(function() {
              $http.get('/decks', {params: {username: localStorage.getItem('currentUser'),  deckname: JSON.parse(localStorage.getItem('currentDeck')).deckname}})
                .then(function(response) {
                    console.log('getting decks', response);
                    localStorage.setItem('decks', JSON.stringify(response.data));
                    // $location.path('/app');
                  },
                  function(err) {console.error('handleSave, EDIT', err);});
            },
            function(err) {console.error(err);});
        setTimeout(function() {that.showme = false;}, 1000);
      }
    };

    this.deleteCard = function(card) {
      if (confirm('Are you sure you want to delete this card?')) {
        var i = this.deck.cards.indexOf(card);
        this.deck.cards.splice(i,1);
      }
    };
    this.moveUp = function(card) {
      var index = this.deck.cards.indexOf(card);
      if(index === 0) {
        return;
      } else {
        var temp = this.deck.cards[index - 1];
        this.deck.cards[index - 1] = this.deck.cards[index];
        this.deck.cards[index] = temp;
      }
    };
    this.moveDown = function(card) {
      var index = this.deck.cards.indexOf(card);
      if(index === this.deck.cards.length-1) {
        return;
      } else {
        var temp = this.deck.cards[index + 1];
        this.deck.cards[index + 1] = this.deck.cards[index];
        this.deck.cards[index] = temp;
      }
    };
    this.toggleHighlightFront = function(card) {

      if (card) {
        card.plaintextFront = !card.plaintextFront;
      } else {
        console.log('No card exist yet', this.newCard.plaintextFront)
        this.newCard.plaintextFront = !this.newCard.plaintextFront;
      }
    };
    this.toggleHighlightBack = function(card) {
      if (card) {
        card.plaintextBack = !card.plaintextBack;
      } else {
        console.log('No card exist yet', this.newCard.plaintextBack)
        this.newCard.plaintextBack = !this.newCard.plaintextBack;
      }
    };
  })
  .component('editPage', {
    controller: 'EditPageCtrl',
    templateUrl: './templates/editPage.html' //calling from index.html
  });