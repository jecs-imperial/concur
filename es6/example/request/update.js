'use strict';

const serialiseOperations = require('../../operations/serialise');

const { toJSON, fromJSON } = serialiseOperations;

class UpdateRequest {
  constructor(operations, userIdentifier, sessionIdentifier) {
    this.operations = operations;
    this.userIdentifier = userIdentifier;
    this.sessionIdentifier = sessionIdentifier;
  }

  getOperations() {
    return this.operations;
  }

  getUserIdentifier() {
    return this.userIdentifier;
  }

  getSessionIdentifier() {
  	return this.sessionIdentifier;
	}

  toJSON() {
    const operationsJSON = toJSON(this.operations),
          operations = operationsJSON,  ///
          json = {
            "operations": operations,
            "userIdentifier": this.userIdentifier,
						"sessionIdentifier": this.sessionIdentifier
          };

    return json;
  }

  static fromJSON(json) {
    const operationsJSON = json["operations"],
          userIdentifierJSON = json["userIdentifier"],
					sessionIdentifierJSON = json["sessionIdentifier"],
          operations = fromJSON(operationsJSON),
          userIdentifier = userIdentifierJSON,  ///
					sessionIdentifier = sessionIdentifierJSON,  ///
          updateRequest = new UpdateRequest(operations, userIdentifier, sessionIdentifier);

    return updateRequest;
  }

  static fromOperationsUserIdentifierAndSessionIdentifier(operations, userIdentifier, sessionIdentifier) {
    const updateRequest = new UpdateRequest(operations, userIdentifier, sessionIdentifier);

    return updateRequest;
  }
}

module.exports = UpdateRequest;
