'use strict';

const session = require('../session'),
      InitialiseResponse = require('../response/initialise');

class InitialiseTransaction {
  constructor(initialiseResponse) {
    this.initialiseResponse = initialiseResponse;
  }

  toJSON() { return this.initialiseResponse.toJSON(); }

  static fromJSON(json) {
    const content = session.getContent(),
          userIdentifier = session.createUser(),
					sessionIdentifier = session.getIdentifier(),
          initialiseResponse = InitialiseResponse.fromContentUserIdentifierAndSessionIdentifier(content, userIdentifier, sessionIdentifier),
          initialiseTransaction = new InitialiseTransaction(initialiseResponse);

    return initialiseTransaction;
  }
}

module.exports = InitialiseTransaction;
