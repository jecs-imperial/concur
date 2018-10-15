'use strict';

const serialiseOperations = require('../operations/serialise');

const { toJSON, fromJSON } = serialiseOperations;

class UpdateResponse {
  constructor(pendingOperations) {
    this.pendingOperations = pendingOperations;
  }

  getPendingOperations() {
    return this.pendingOperations;
  }

  toJSON() {
    const pendingOperationsJSON = toJSON(this.pendingOperations),
          pendingOperations = pendingOperationsJSON,  ///
          json = {
            "pendingOperations": pendingOperations
          };

    return json;
  }

  static fromJSON(json) {
    const pendingOperationsJSON = json["pendingOperations"],
          pendingOperations = fromJSON(pendingOperationsJSON),
          updateResponse = new UpdateResponse(pendingOperations);

    return updateResponse;
  }

  static fromPendingOperations(pendingOperations) {
    const updateResponse = new UpdateResponse(pendingOperations);

    return updateResponse;
  }
}

module.exports = UpdateResponse;
