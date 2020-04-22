"use strict";

export default function transformContent(content, operations) {
  return operations.reduce((content, operation) => {
    return operation.transformContent(content);
  }, content);
}
