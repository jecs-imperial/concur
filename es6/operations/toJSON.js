"use strict";

function operationsToJSON(operations) {
  return operations.map(function(operation) {
    return operation.toJSON();
  });
}

module.exports = operationsToJSON;
