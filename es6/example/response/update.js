'use strict';

const serialiseOperations = require('../../operations/serialise');

const { toJSON, fromJSON } = serialiseOperations;

class UpdateResponse {
  constructor(sessionExpired, pendingOperations) {
  	this.sessionExpired = sessionExpired;
    this.pendingOperations = pendingOperations;
  }

  getSessionExpired() {
  	return this.sessionExpired;
	}

  getPendingOperations() {
    return this.pendingOperations;
  }

  toJSON() {
    const pendingOperationsJSON = toJSON(this.pendingOperations),
          pendingOperations = pendingOperationsJSON,  ///
          json = {
    				"sessionExpired": this.sessionExpired,
            "pendingOperations": pendingOperations
          };

    return json;
  }

  static fromJSON(json) {
    const sessionExpiredJSON = json["sessionExpired"],
					pendingOperationsJSON = json["pendingOperations"],
					sessionExpired = sessionExpiredJSON,	///
					pendingOperations = fromJSON(pendingOperationsJSON),
          updateResponse = new UpdateResponse(sessionExpired, pendingOperations);

    return updateResponse;
  }

  static fromSessionExpiredAndPendingOperations(sessionExpired, pendingOperations) {
    const updateResponse = new UpdateResponse(sessionExpired, pendingOperations);

    return updateResponse;
  }
}

module.exports = UpdateResponse;
