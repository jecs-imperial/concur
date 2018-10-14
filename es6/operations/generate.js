'use strict';

const InsertOperation = require('../operation/insert'),
      DeleteOperation = require('../operation/delete');

function generateOperations(fromContent, toContent) {
  const operations = [];
  
  let left, right, length, string, position;

  for (left = 0; (left < fromContent.length) && (left < toContent.length) && (fromContent[left] === toContent[left]); left++) {}

  for (right = 0; (right < fromContent.length - left) && (right < toContent.length - left) && (fromContent[fromContent.length - right - 1] === toContent[toContent.length - right - 1]); right++) {}

  if (left + right !== fromContent.length) {
    length = fromContent.length - left - right;  ///
    position = left; ///
    
    const deleteOperation = new DeleteOperation(length, position);

    operations.push(deleteOperation);
  }

  if (left + right !== toContent.length) {
    string = toContent.substring(left, toContent.length - right);  ///
    position = left; ///
    
    const insertOperation = new InsertOperation(string, position);

    operations.push(insertOperation);
  }

  return operations;
};

module.exports = generateOperations;
