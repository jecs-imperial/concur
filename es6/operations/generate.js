'use strict';

const InsertOperation = require('../operation/insert'),
      DeleteOperation = require('../operation/delete');

function generateOperations(workingContent, editableContent) {
  const operations = [];
  
  let left, right, length, string, position;

  for (left = 0; (left < workingContent.length) && (left < editableContent.length) && (workingContent[left] === editableContent[left]); left++) {}

  for (right = 0; (right < workingContent.length - left) && (right < editableContent.length - left) && (workingContent[workingContent.length - right - 1] === editableContent[editableContent.length - right - 1]); right++) {}

  if (left + right !== workingContent.length) {
    length = workingContent.length - left - right;  ///
    position = left; ///
    
    const deleteOperation = DeleteOperation.fromLengthAndPosition(length, position);

    operations.push(deleteOperation);
  }

  if (left + right !== editableContent.length) {
    string = editableContent.substring(left, editableContent.length - right);  ///
    position = left; ///
    
    const insertOperation = InsertOperation.fromStringAndPosition(string, position);

    operations.push(insertOperation);
  }

  return operations;
}

module.exports = generateOperations;
