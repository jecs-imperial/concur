"use strict";

export default function transformContent(content, operations) {
  return operations.reduce((content, operation) => operation.transformContent(content), content);
}
