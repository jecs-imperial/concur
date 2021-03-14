"use strict";

export default class InitialiseRequest {
  toJSON() {
    const json = {};  ///

    return json;
  }

  static fromNothing() {
    const initialiseRequest = new InitialiseRequest();

    return initialiseRequest;
  }
}
