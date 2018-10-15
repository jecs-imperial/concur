'use strict';

class InitialiseResponse {
  constructor(userIdentifier) {
    this.userIdentifier = userIdentifier;
  }

  getUserIdentifier() {
    return this.userIdentifier;
  }

  toJSON() {
    const json = {
      "userIdentifier": this.userIdentifier
    };

    return json;
  }

  static fromJSON(json) {
    const userIdentifierJSON = json["userIdentifier"],
          userIdentifier = userIdentifierJSON,  ///
          initialiseResponse = new InitialiseResponse(userIdentifier);

    return initialiseResponse;
  }

  static fromUserIdentifier(userIdentifier) {
    const initialiseResponse = new InitialiseResponse(userIdentifier);

    return initialiseResponse;
  }
}

module.exports = InitialiseResponse;
