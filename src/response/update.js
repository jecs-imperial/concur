"use strict";

import operationsToJSON from "../operations/toJSON";
import operationsFromJSON from "../operations/fromJSON";

export default class UpdateResponse {
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
    const pendingOperationsJSON = operationsToJSON(this.pendingOperations),
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
					pendingOperations = operationsFromJSON(pendingOperationsJSON),
          updateResponse = new UpdateResponse(sessionExpired, pendingOperations);

    return updateResponse;
  }

  static fromSessionExpiredAndPendingOperations(sessionExpired, pendingOperations) {
    const updateResponse = new UpdateResponse(sessionExpired, pendingOperations);

    return updateResponse;
  }
}
