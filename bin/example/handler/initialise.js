'use strict';

const session = require('../session'),
      InitialiseResponse = require('../../../es6/example/response/initialise');

class InitialiseHandler {
  constructor(initialiseResponse) {
    this.initialiseResponse = initialiseResponse;
  }

  toJSON() { return this.initialiseResponse.toJSON(); }

  static fromJSON(json) {
    const content = session.getContent(),
          userIdentifier = session.createUser(),
					sessionIdentifier = session.getIdentifier(),
          initialiseResponse = InitialiseResponse.fromContentUserIdentifierAndSessionIdentifier(content, userIdentifier, sessionIdentifier),
          initialiseHandler = new InitialiseHandler(initialiseResponse);

    return initialiseHandler;
  }
}

module.exports = InitialiseHandler;
