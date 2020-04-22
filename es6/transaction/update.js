"use strict";

const session = require("../session"),
      UpdateRequest = require("../request/update"),
      UpdateResponse = require("../response/update");

class UpdateTransaction {
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
					pendingOperations = session.update(operations, userIdentifier, sessionExpired),
          updateResponse = UpdateResponse.fromSessionExpiredAndPendingOperations(sessionExpired, pendingOperations),
          updateTransaction = new UpdateTransaction(updateResponse);

    return updateTransaction;
  }
}

module.exports = UpdateTransaction;
