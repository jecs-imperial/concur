'use strict';

class InitialiseHandler {
  constructor() {

  }

  toJSON() {
    return {};  ///
  }

  static fromJSON(json) {
    const initialiseHandler = new InitialiseHandler();

    return initialiseHandler;
  }
}

module.exports = InitialiseHandler;