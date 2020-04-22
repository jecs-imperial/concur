"use strict";

import transformOperations from "./operations/transform";

let identifier = 0;

export default class User {
  constructor(identifier, pendingOperations) {
    this.identifier = identifier;
    this.pendingOperations = pendingOperations;
  }

  getIdentifier() {
    return this.identifier;
  }

  getPendingOperations() {
    return this.pendingOperations;
  }

  reset() {
    this.pendingOperations = [];
  }

  update(transformedOperations) {
    this.pendingOperations = this.pendingOperations.concat(transformedOperations);
  }

  transformOperations(operations) {
    const transformedOperations = transformOperations(operations, this.pendingOperations);

    return transformedOperations;
  }

  transformedPendingOperations(operations) {
    const transformedPendingOperations = transformOperations(this.pendingOperations, operations);

    return transformedPendingOperations;
  }

  static fromNothing() {
    const pendingOperations = [],
          user = new User(identifier++, pendingOperations);

    return user;
  }
}
