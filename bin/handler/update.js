'use strict';

const server = require('../server'),
      UpdateRequest = require('../../es6/example/request/update'),
      UpdateResponse = require('../../es6/example/response/update');

const { generatePendingOperations } = server;

class UpdateHandler {
  constructor(updateResponse) {
    this.updateResponse = updateResponse;
  }

  toJSON() { return this.updateResponse.toJSON(); }

  static fromJSON(json) {
    const updateRequest = UpdateRequest.fromJSON(json),
          operations = updateRequest.getOperations(),
          userIdentifier = updateRequest.getUserIdentifier(),
          pendingOperations = generatePendingOperations(operations, userIdentifier),
          updateResponse = UpdateResponse.fromPendingOperations(pendingOperations),
          updateHandler = new UpdateHandler(updateResponse);

    return updateHandler;
  }
}

module.exports = UpdateHandler;
