'use strict';

class InitialiseRequest {
  toJSON() {
    const json = {};  ///

    return json;
  }

  static fromNothing() {
    const initialiseRequest = new InitialiseRequest();

    return initialiseRequest;
  }
}

module.exports = InitialiseRequest;
