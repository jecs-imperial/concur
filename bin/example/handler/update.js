'use strict';

const session = require('../session'),
      UpdateRequest = require('../../../es6/example/request/update'),
      UpdateResponse = require('../../../es6/example/response/update');

class UpdateHandler {
  constructor(updateResponse) {
    this.updateResponse = updateResponse;
  }

  toJSON() { return this.updateResponse.toJSON(); }

  static fromJSON(json) {
    const updateRequest = UpdateRequest.fromJSON(json),
          operations = updateRequest.getOperations(),
          userIdentifier = updateRequest.getUserIdentifier(),
					sessionIdentifier = updateRequest.getSessionIdentifier(),
					sessionExpired = session.hasExpired(sessionIdentifier),
					pendingOperations = sessionExpired ?
																[] :
																	session.update(operations, userIdentifier),
          updateResponse = UpdateResponse.fromSessionExpiredAndPendingOperations(sessionExpired, pendingOperations),
          updateHandler = new UpdateHandler(updateResponse);

    return updateHandler;
  }
}

module.exports = UpdateHandler;
