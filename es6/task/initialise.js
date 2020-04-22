"use strict";

import { AsynchronousTask } from "sufficient";

import InitialiseRequest from "../request/initialise";
import InitialiseResponse from "../response/initialise";

import { initialisePost } from "../poster";

class InitialiseTask extends AsynchronousTask {
  constructor(callback) {
    super(asynchronousMethod, callback)
  }
}

module.exports = InitialiseTask;

function asynchronousMethod(callback) {
  const initialiseRequest = InitialiseRequest.fromNothing(),
        json = initialiseRequest.toJSON();

  initialisePost(json, (json) => {
    const initialiseResponse = InitialiseResponse.fromJSON(json),
          content = initialiseResponse.getContent(),
          userIdentifier = initialiseResponse.getUserIdentifier(),
					sessionIdentifier = initialiseResponse.getSessionIdentifier();

    callback(content, userIdentifier, sessionIdentifier);
  });
}
