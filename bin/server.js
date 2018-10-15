'use strict';

let userIdentifier = 0;

function generateUserIdentifier() {
  return (userIdentifier++)
}

function generatePendingOperations(operations, userIdentifier) {
  const pendingOperations = [];

  return pendingOperations;
}

module.exports = {
  generateUserIdentifier,
  generatePendingOperations
};
