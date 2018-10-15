'use strict';

class InitialiseResponse {
  constructor(content, userIdentifier) {
    this.content = content;
    this.userIdentifier = userIdentifier;
  }

  getContent() {
    return this.content;
  }

  getUserIdentifier() {
    return this.userIdentifier;
  }

  toJSON() {
    const json = {
      "content": this.content,
      "userIdentifier": this.userIdentifier
    };

    return json;
  }

  static fromJSON(json) {
    const contentJSON = json["content"],
          userIdentifierJSON = json["userIdentifier"],
          content = contentJSON,  ///
          userIdentifier = userIdentifierJSON,  ///
          initialiseResponse = new InitialiseResponse(content, userIdentifier);

    return initialiseResponse;
  }

  static fromContentAndUserIdentifier(content, userIdentifier) {
    const initialiseResponse = new InitialiseResponse(content, userIdentifier);

    return initialiseResponse;
  }
}

module.exports = InitialiseResponse;
