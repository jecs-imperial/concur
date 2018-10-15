'use strict';

const server = require('../server'),
      InitialiseResponse = require('../../es6/example/response/initialise');

const { getContent, generateUserIdentifier } = server;

class InitialiseHandler {
  constructor(initialiseResponse) {
    this.initialiseResponse = initialiseResponse;
  }

  toJSON() { return this.initialiseResponse.toJSON(); }

  static fromJSON(json) {
    const content = getContent(),
          userIdentifier = generateUserIdentifier(),
          initialiseResponse = InitialiseResponse.fromContentAndUserIdentifier(content, userIdentifier),
          initialiseHandler = new InitialiseHandler(initialiseResponse);

    return initialiseHandler;
  }
}

module.exports = InitialiseHandler;
