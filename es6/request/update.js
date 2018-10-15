'use strict';

const generateOperations = require('../operations/generate'),
      serialiseOperations = require('../operations/serialise');

const { toJSON, fromJSON } = serialiseOperations;

class UpdateRequest {
  constructor(userIdentifier, operations) {
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

  static fromUserIdentifierContentAndPreviousContent(userIdentifier, content, previousContent) {
    const operations = generateOperations(content, previousContent),  ///
          updateRequest = new UpdateRequest(userIdentifier, operations);

    return updateRequest;
  }
}

module.exports = UpdateRequest;
