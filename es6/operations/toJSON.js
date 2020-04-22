"use strict";

export default function operationsToJSON(operations) {
  return operations.map((operation) => {
    return operation.toJSON();
  });
}
