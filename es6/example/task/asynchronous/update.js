'use strict';

const sufficient = require('sufficient');

const post = require('../../post'),
      UpdateRequest = require('../../request/update'),
      UpdateResponse = require('../../response/update'),
      generateOperations = require('../../../operations/generate');

const { postUpdate } = post,
      { AsynchronousTask } = sufficient;

class UpdateAsynchronousTask extends AsynchronousTask {
  constructor(userIdentifier, workingContent, editableContent, callback) {
    super(asynchronousMethod, userIdentifier, workingContent, editableContent, callback)
  }
}

module.exports = UpdateAsynchronousTask;

function asynchronousMethod(userIdentifier, workingContent, editableContent, callback) {
  const operations = generateOperations(workingContent, editableContent),
        updateRequest = UpdateRequest.fromOperationsAndUserIdentifier(operations, userIdentifier),
        json = updateRequest.toJSON();

  postUpdate(json, function(json) {
    const updateResponse = UpdateResponse.fromJSON(json),
          pendingOperations = updateResponse.getPendingOperations();

    callback(pendingOperations);
  });
}
