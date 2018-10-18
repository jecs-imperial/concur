'use strict';

const sufficient = require('sufficient');

const poster = require('../../poster'),
      InitialiseRequest = require('../../request/initialise'),
      InitialiseResponse = require('../../response/initialise');

const { initialisePost } = poster,
      { AsynchronousTask } = sufficient;

class InitialiseAsynchronousTask extends AsynchronousTask {
  constructor(callback) {
    super(asynchronousMethod, callback)
  }
}

module.exports = InitialiseAsynchronousTask;

function asynchronousMethod(callback) {
  const initialiseRequest = InitialiseRequest.fromNothing(),
        json = initialiseRequest.toJSON();

  initialisePost(json, function(json) {
    const initialiseResponse = InitialiseResponse.fromJSON(json),
          content = initialiseResponse.getContent(),
          userIdentifier = initialiseResponse.getUserIdentifier(),
					sessionIdentifier = initialiseResponse.getSessionIdentifier();

    callback(content, userIdentifier, sessionIdentifier);
  });
}
