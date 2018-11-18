'use strict';

const sufficient = require('sufficient');

const poster = require('../poster'),
      UpdateRequest = require('../request/update'),
      UpdateResponse = require('../response/update'),
      generateOperations = require('../../operations/generate');

const { updatePost } = poster,
      { AsynchronousTask } = sufficient;

class UpdateTask extends AsynchronousTask {
  constructor(userIdentifier, sessionIdentifier, workingContent, editableContent, callback) {
    super(asynchronousMethod, userIdentifier, sessionIdentifier, workingContent, editableContent, callback)
  }
}

module.exports = UpdateTask;

function asynchronousMethod(userIdentifier, sessionIdentifier, workingContent, editableContent, callback) {
  const operations = generateOperations(workingContent, editableContent),
        updateRequest = UpdateRequest.fromOperationsUserIdentifierAndSessionIdentifier(operations, userIdentifier, sessionIdentifier),
        json = updateRequest.toJSON();

  updatePost(json, function(json) {
    const updateResponse = UpdateResponse.fromJSON(json),
					sessionExpired = updateResponse.getSessionExpired(),
          pendingOperations = updateResponse.getPendingOperations();

    callback(sessionExpired, pendingOperations);
  });
}
