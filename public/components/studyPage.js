angular.module('flash-card')
.controller('StudyCtrl', function($http, $location, $timeout) {

  var shuffleDeck = function(deck) {
    for (var i = 0; i < deck.length; i++) {
      var random = Math.floor(Math.random()*(deck.length-i)) + i;
      var switchedCard = deck[random];
      deck[random] = deck[i];
      deck[i] = switchedCard;
    }
    return deck;
  };

  //Grab the entire deck object so we have access to the deck id for saving later
  this.deck = JSON.parse(localStorage.getItem('currentDeck'));
  this.shuffledDeck = shuffleDeck(this.deck.cards);

  this.showPrev = false;
  if(this.shuffledDeck.length === 1) {
    this.showNext = false;
  } else {
    this.showNext = true;
  }

  this.current = this.shuffledDeck[0];
  this.front = true;
  this.flipped = false;

  this.counter = 0;

  var resetConditionToInitialState = {
    'handleNext' : function (studyControllerVariables) {
      var that = studyControllerVariables;
      if (that.counter === that.shuffledDeck.length - 2) {
        that.showNext = false;
      }
      that.showPrev = true;
      that.counter++;
      this.setToInitialState(studyControllerVariables);
    },
    'handlePrev' : function (studyControllerVariables) {
      var that = studyControllerVariables;
      if (that.counter - 1 === 0) {
        that.showPrev = false;
      }
      that.showNext = true;
      that.counter--;
      this.setToInitialState(studyControllerVariables);
    },
    'setToInitialState' : function (studyControllerVariables) {
      var that = studyControllerVariables;
      that.front = true;
      that.flipped = false;
      that.current = that.shuffledDeck[that.counter];
      that.highlightingHelperFn(that.current.front);
    }
  }

  this.handleNext = () => {
    resetConditionToInitialState['handleNext'](this);
  };

  this.handlePrev = () => {
    resetConditionToInitialState['handlePrev'](this);
  };

  this.rateCard = (status, $event) => {
    console.log('this.current.status before: ', this.current.status);
    this.current.status = status;
    console.log('this.current.status after: ', this.current.status);

    $event.stopPropagation();
    $event.preventDefault();
  }

  this.resetState = () => {
    this.showPrev = false;
    if(this.shuffledDeck.length === 1) {
      this.showNext = false;
    } else {
      this.showNext = true;
    }

    this.current = this.shuffledDeck[0];
    this.front = true;
    this.flipped = false;

    this.counter = 0;

  };

  this.toggleCardsViewed = (view) => {

    if (view === "hide") {
      var viewCard = this.shuffledDeck.filter(function(card) {
        return (card.status === false)
      });

      this.shuffledDeck = viewCard;
      this.resetState();
      console.log('show matching', this.shuffledDeck)
    } else {
      this.shuffledDeck = shuffleDeck(this.deck.cards);
      this.resetState();
      console.log('show all', this.shuffledDeck)
    }

  };

  this.handleFlip = () => {
    this.front = !this.front;
    this.flipped = !this.flipped;

    if (this.front === true && this.flipped === false) {
      this.highlightingHelperFn(this.current.front);
    } else {
      this.highlightingHelperFn(this.current.back);
    }
  };

  //-------------------------------------------------------------------------------------
  /*  This function essentially:
   *    - checks if a given card is displaying a side that needs to be styled as code
   *    - grabs the content of the card
   *    - creates a new <code> element
   *    - copies the data in
   *    - inserts the new <code> element into the DOM and removes the old <h1>
   *    - similarly wraps the <code> element in a newly created <pre> element
   *    - applies a few basic styles
   *
   *  This function is run under four conditions: when a card is fliped, when 'next' or
   *  or 'previous' buttons are clicked, and when the very first card is loaded for the
   *  study session.
   */
  this.highlightingHelperFn = (flashCardQuestion) => {
    $timeout(() => {

      if (this.front === true && this.current.plaintextFront === false || this.front === false && this.current.plaintextBack === false) {
        // our logic here
        var card = document.getElementsByClassName("studycard"); // card is an HTMLCollection object
        var cardHTML = card[0].childNodes[0]; // the h1 in which we displayed the user input
        var content = flashCardQuestion || cardHTML.innerHTML; // the value of the h1

        var newCodeTag = document.createElement('code');

        cardHTML.parentNode.insertBefore(newCodeTag, cardHTML); // add code tag in next to h1
        newCodeTag.innerHTML = content; // copy the content
        cardHTML.parentNode.removeChild(cardHTML); // remove the h1

        // now we have a <code>stuff user typed</code> for each item

        var newPreTag = document.createElement('pre');
        newCodeTag.parentNode.insertBefore(newPreTag, newCodeTag); // add pre next to code
        newPreTag.appendChild(newCodeTag); // make code a child of pre

        // now we have:
        // <pre>
        //   <code>stuff user typed</code>
        // </pre>
        //
        // where the old h1 used to be

        // change two quick default styles for this card:
        newPreTag.parentNode.setAttribute("style", "padding:10px; text-align: left; overflow: hidden; overflow-y: scroll;");

        hljs.highlightBlock(newPreTag);
      }
    }, 1);
  };

  this.handleSave = () => {
    var id = this.deck._id;
    var that = this;
    this.shuffledDeck.forEach(function(card) {
      for (var i = 0; i < that.deck.cards.length; i++) {
        if (that.deck.cards[i].front === card.front && that.deck.cards[i].back === card.back) {
          that.deck.cards[i] = card;
        }
      }
    });
    $http.put('/decks/', this.deck, {params: {username: localStorage.getItem('currentUser')}}).then(function() {
      $http.get('/decks', {params: {username: localStorage.getItem('currentUser')}}).then(function(response) {
        console.log('getting decks', response);
        localStorage.setItem('decks', JSON.stringify(response.data));
        $location.path('/app');
      }, function(err) {console.error('handleSave, EDIT', err);});
    }, function(err) {console.error(err);});
    //uncomment if test fails --> john's note
    // $http.put('/decks/', this.deck).then(function() {
    //   $location.path('/app');
    // });
  };

  // initialize the first card to check for whether to highlight
  this.highlightingHelperFn();
});
