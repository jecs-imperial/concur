'use strict';

const necessary = require('necessary'),
      sufficient = require('sufficient');

const uris = require('../../uris'),
      InitialiseRequest = require('../../request/initialise'),
      InitialiseResponse = require('../../response/initialise');

const { miscellaneousUtilities } = necessary,
      { AsynchronousTask } = sufficient,
      { post } = miscellaneousUtilities,
      { INITIALISE_URI } = uris;

class InitialiseAsynchronousTask extends AsynchronousTask {
  constructor(host, callback) {
    super(asynchronousMethod, host, callback)
  }
}

module.exports = InitialiseAsynchronousTask;

function asynchronousMethod(host, callback) {
  const initialiseRequest = InitialiseRequest.fromNothing(),
        uri = INITIALISE_URI,
        json = initialiseRequest.toJSON();

  post(host, uri, json, function(json) {
    const initialiseResponse = InitialiseResponse.fromJSON(json),
          userIdentifier = initialiseResponse.getUserIdentifier();

    callback(userIdentifier);
  });
}
