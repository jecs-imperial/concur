"use strict";

class InitialiseResponse {
  constructor(content, userIdentifier, sessionIdentifier) {
    this.content = content;
    this.userIdentifier = userIdentifier;
    this.sessionIdentifier = sessionIdentifier;
  }

  getContent() {
    return this.content;
  }

  getUserIdentifier() {
    return this.userIdentifier;
  }

  getSessionIdentifier() {
  	return this.sessionIdentifier;
	}

  toJSON() {
    const json = {
      "content": this.content,
      "userIdentifier": this.userIdentifier,
			"sessionIdentifier": this.sessionIdentifier
    };

    return json;
  }

  static fromJSON(json) {
    const contentJSON = json["content"],
          userIdentifierJSON = json["userIdentifier"],
					sessionIdentifierJSON = json["sessionIdentifier"],
          content = contentJSON,  ///
          userIdentifier = userIdentifierJSON,  ///
					sessionIdentifier = sessionIdentifierJSON,  ///
          initialiseResponse = new InitialiseResponse(content, userIdentifier, sessionIdentifier);

    return initialiseResponse;
  }

  static fromContentUserIdentifierAndSessionIdentifier(content, userIdentifier, sessionIdentifier) {
    const initialiseResponse = new InitialiseResponse(content, userIdentifier, sessionIdentifier);

    return initialiseResponse;
  }
}

module.exports = InitialiseResponse;
