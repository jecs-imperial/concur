'use strict';

const InsertOperation = require('../operation/insert'),
      DeleteOperation = require('../operation/delete');

function generateOperations(content, previousContent) {
  const operations = [];
  
  let left, right, length, string, position;

  for (left = 0; (left < previousContent.length) && (left < content.length) && (previousContent[left] === content[left]); left++) {}

  for (right = 0; (right < previousContent.length - left) && (right < content.length - left) && (previousContent[previousContent.length - right - 1] === content[content.length - right - 1]); right++) {}

  if (left + right !== previousContent.length) {
    length = previousContent.length - left - right;  ///
    position = left; ///
    
    const deleteOperation = DeleteOperation.fromLengthAndPosition(length, position);

    operations.push(deleteOperation);
  }

  if (left + right !== content.length) {
    string = content.substring(left, content.length - right);  ///
    position = left; ///
    
    const insertOperation = InsertOperation.fromStringAndPosition(string, position);

    operations.push(insertOperation);
  }

  return operations;
}

module.exports = generateOperations;
