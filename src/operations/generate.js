"use strict";

import InsertOperation from "../operation/insert";
import DeleteOperation from "../operation/delete";

export default function generateOperations(workingContent, editableContent) {
  const operations = [],
        workingContentLength = workingContent.length,
        editableContentLength = editableContent.length;
  
  let left, right;

  for (left = 0; (left < workingContentLength) && (left < editableContentLength); left++) {
    if (workingContent[left] !== editableContent[left]) {
      break;
    }
  }

  for (right = 0; (right < workingContentLength - left) && (right < editableContentLength - left); right++) {
    if (workingContent[workingContentLength - right - 1] !== editableContent[editableContentLength - right - 1]) {
      break;
    }
  }

  if (left + right !== workingContentLength) {
    const length = workingContentLength - left - right,  ///
          position = left, ///
          deleteOperation = DeleteOperation.fromLengthAndPosition(length, position);

    operations.push(deleteOperation);
  }

  if (left + right !== editableContentLength) {
    const string = editableContent.substring(left, editableContentLength - right),  ///
          position = left, ///
          insertOperation = InsertOperation.fromStringAndPosition(string, position);

    operations.push(insertOperation);
  }

  return operations;
}
