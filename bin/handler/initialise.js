'use strict';

const server = require('../server'),
      InitialiseResponse = require('../../es6/response/initialise');

const { generateUserIdentifier } = server;

class InitialiseHandler {
  constructor(initialiseResponse) {
    this.initialiseResponse = initialiseResponse;
  }

  toJSON() { return this.initialiseResponse.toJSON(); }

  static fromJSON(json) {
    const userIdentifier = generateUserIdentifier(),
          initialiseResponse = InitialiseResponse.fromUserIdentifier(userIdentifier),
          initialiseHandler = new InitialiseHandler(initialiseResponse);

    return initialiseHandler;
  }
}

module.exports = InitialiseHandler;
