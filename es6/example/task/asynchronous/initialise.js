'use strict';

const sufficient = require('sufficient');

const post = require('../../post'),
      InitialiseRequest = require('../../request/initialise'),
      InitialiseResponse = require('../../response/initialise');

const { postInitialise } = post,
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

  postInitialise(json, function(json) {
    const initialiseResponse = InitialiseResponse.fromJSON(json),
          content = initialiseResponse.getContent(),
          userIdentifier = initialiseResponse.getUserIdentifier();

    callback(content, userIdentifier);
  });
}
