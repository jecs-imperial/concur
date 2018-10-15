'use strict';

const sufficient = require('sufficient');

const post = require('../../post'),
      UpdateRequest = require('../../request/update'),
      UpdateResponse = require('../../response/update'),
      generateOperations = require('../../../operations/generate');

const { postUpdate } = post,
      { AsynchronousTask } = sufficient;

class UpdateAsynchronousTask extends AsynchronousTask {
  constructor(userIdentifier, content, previousContent, callback) {
    super(asynchronousMethod, userIdentifier, content, previousContent, callback)
  }
}

module.exports = UpdateAsynchronousTask;

function asynchronousMethod(userIdentifier, content, previousContent, callback) {
  const operations = generateOperations(content, previousContent),
        updateRequest = UpdateRequest.fromOperationsAndUserIdentifier(operations, userIdentifier),
        json = updateRequest.toJSON();

  postUpdate(json, function(json) {
    const updateResponse = UpdateResponse.fromJSON(json),
          pendingOperations = updateResponse.getPendingOperations();

    callback(pendingOperations);
  });
}
