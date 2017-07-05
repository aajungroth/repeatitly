# Repeat.it

Repeat.it is a web app that allows users to create and study flashcards online. After signing into Repeat.it, users can create flashcard decks, edit existing decks, study their decks in random order and delete any decks they no longer need. A unique feature of Repeat.it is the ability to style cards as code, allowing them to create flashcards for studying various programming language snippets.

## Team Melmac

  - __Product Owner__: Alex Jungroth
  - __Scrum Master__: John Roxborough
  - __Development Team Members__: David Berry, Mark Suyat

## Table of Contents

1. [Features](#Features)
2. [Requirements](#requirements)
3. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    2. [Tasks](#tasks)
4. [Team](#team)
5. [Contributing](#contributing)

## Features

- Add test suite
 - Add to tests as features are developed
- Read only access for public decks
- Ability to fork decks
- Mark answers right or wrong and keep track of progress
  - Multiple levels of knowledge b, bp, or p
- Write access to public decks
- Key press handlers
  - for going between cards, flipping cards
- Add code styling when creating card

## Requirements

- AngularJS 1.6.4 (included as CDN)
- Angular-route (included as CDN)
- bcrypt
- body-parser
- express
- mongoose
- mongoDB
- Bootstrap (included as CDN)
- Highlight.js (included as CDN)

## Development

### Installing Dependencies

From within the root directory:

```
npm install
```
### Tasks

In order to open the Node server and the MongoDB server, from within the root directory:

```
node server.js
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines and ideas to extend the app.