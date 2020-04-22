"use strict";

const sufficient = require("sufficient");

const poster = require("../poster"),
      InitialiseRequest = require("../request/initialise"),
      InitialiseResponse = require("../response/initialise");

const { initialisePost } = poster,
      { AsynchronousTask } = sufficient;

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
