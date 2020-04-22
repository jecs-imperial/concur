"use strict";

function transformContent(content, operations) {
  return operations.reduce((content, operation) => {
    return operation.transformContent(content);
  }, content);
}

module.exports = transformContent;
