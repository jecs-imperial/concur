'use strict';

const serialiseOperations = require('../../operations/serialise');

const { toJSON, fromJSON } = serialiseOperations;

class UpdateRequest {
  constructor(operations, userIdentifier) {
    this.operations = operations;
    this.userIdentifier = userIdentifier;
  }

  getOperations() {
    return this.operations;
  }

  getUserIdentifier() {
    return this.userIdentifier;
  }

  toJSON() {
    const operationsJSON = toJSON(this.operations),
          operations = operationsJSON,  ///
          json = {
            "operations": operations,
            "userIdentifier": this.userIdentifier
          };

    return json;
  }

  static fromJSON(json) {
    const operationsJSON = json["operations"],
          userIdentifierJSON = json["userIdentifier"],
          operations = fromJSON(operationsJSON),
          userIdentifier = userIdentifierJSON,  ///
          updateRequest = new UpdateRequest(operations, userIdentifier);

    return updateRequest;
  }

  static fromOperationsAndUserIdentifier(operations, userIdentifier) {
    const updateRequest = new UpdateRequest(operations, userIdentifier);

    return updateRequest;
  }
}

module.exports = UpdateRequest;
