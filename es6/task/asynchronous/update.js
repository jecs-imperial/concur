'use strict';

const necessary = require('necessary'),
      sufficient = require('sufficient');

const uris = require('../../uris'),
      UpdateRequest = require('../../request/update'),
      UpdateResponse = require('../../response/update');

const { miscellaneousUtilities } = necessary,
      { AsynchronousTask } = sufficient,
      { post } = miscellaneousUtilities,
      { UPDATE_URI } = uris;

class UpdateAsynchronousTask extends AsynchronousTask {
  constructor(host, userIdentifier, content, previousContent, callback) {
    super(asynchronousMethod, host, userIdentifier, content, previousContent, callback)
  }
}

module.exports = UpdateAsynchronousTask;

function asynchronousMethod(host, userIdentifier, content, previousContent, callback) {
  const updateRequest = UpdateRequest.fromUserIdentifierContentAndPreviousContent(userIdentifier, content, previousContent),
        uri = UPDATE_URI,
        json = updateRequest.toJSON();

  post(host, uri, json, function(json) {
    const updateResponse = UpdateResponse.fromJSON(json),
          pendingOperations = updateResponse.getPendingOperations();

    callback(pendingOperations);
  });
}
