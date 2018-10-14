'use strict';

function transformContent(content, operations) {
  return operations.reduce(function(content, operation) {
    return operation.transformContent(content);
  }, content);
}

module.exports = transformContent;
