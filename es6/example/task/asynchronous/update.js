'use strict';

const sufficient = require('sufficient');

const post = require('../../post'),
      UpdateRequest = require('../../request/update'),
      UpdateResponse = require('../../response/update'),
      generateOperations = require('../../../operations/generate');

const { postUpdate } = post,
      { AsynchronousTask } = sufficient;

class UpdateAsynchronousTask extends AsynchronousTask {
  constructor(userIdentifier, sessionIdentifier, workingContent, editableContent, callback) {
    super(asynchronousMethod, userIdentifier, sessionIdentifier, workingContent, editableContent, callback)
  }
}

module.exports = UpdateAsynchronousTask;

function asynchronousMethod(userIdentifier, sessionIdentifier, workingContent, editableContent, callback) {
  const operations = generateOperations(workingContent, editableContent),
        updateRequest = UpdateRequest.fromOperationsUserIdentifierAndSessionIdentifier(operations, userIdentifier, sessionIdentifier),
        json = updateRequest.toJSON();

  postUpdate(json, function(json) {
    const updateResponse = UpdateResponse.fromJSON(json),
					sessionExpired = updateResponse.getSessionExpired(),
          pendingOperations = updateResponse.getPendingOperations();

    callback(sessionExpired, pendingOperations);
  });
}
