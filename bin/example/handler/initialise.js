'use strict';

const server = require('../server'),
      InitialiseResponse = require('../../../es6/example/response/initialise');

const { createUser, getContent, getSessionIdentifier } = server;

class InitialiseHandler {
  constructor(initialiseResponse) {
    this.initialiseResponse = initialiseResponse;
  }

  toJSON() { return this.initialiseResponse.toJSON(); }

  static fromJSON(json) {
    const content = getContent(),
          userIdentifier = createUser(),
					sessionIdentifier = getSessionIdentifier(),
          initialiseResponse = InitialiseResponse.fromContentUserIdentifierAndSessionIdentifier(content, userIdentifier, sessionIdentifier),
          initialiseHandler = new InitialiseHandler(initialiseResponse);

    return initialiseHandler;
  }
}

module.exports = InitialiseHandler;
