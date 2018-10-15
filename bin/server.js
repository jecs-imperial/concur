'use strict';

let userIdentifier = 0;

let content = '13241234';

function getContent() {
  return content;
}

function generateUserIdentifier() {
  return (userIdentifier++)
}

function generatePendingOperations(operations, userIdentifier) {
  const pendingOperations = [];

  return pendingOperations;
}

module.exports = {
  getContent,
  generateUserIdentifier,
  generatePendingOperations
};
