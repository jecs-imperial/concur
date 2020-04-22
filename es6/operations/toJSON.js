"use strict";

function operationsToJSON(operations) {
  return operations.map((operation) => {
    return operation.toJSON();
  });
}

module.exports = operationsToJSON;
