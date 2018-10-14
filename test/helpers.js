'use strict';

const randomSeed = require('random-seed');

const EmptyOperation = require('../es6/operation/empty'),
      InsertOperation = require('../es6/operation/insert'),
      DeleteOperation = require('../es6/operation/delete');

const DEFAULT_CONTENT = '',
      DEFAULT_NUMBER_OF_OPERATIONS = 2,
      MAXIMUM_INSERT_OPERATION_LENGTH = 4;

const random = randomSeed.create('.');

function content(content = DEFAULT_CONTENT, numberOfOperations = DEFAULT_NUMBER_OF_OPERATIONS) {
  for (let i = 0; i < numberOfOperations; i++) {
    const operation = generateOperation(content);

    content = operation.transformContent(content);
  }

  return content;
}

function operations(content, numberOfOperations = DEFAULT_NUMBER_OF_OPERATIONS) {
  const operations = [];

  for (let i = 0; i < numberOfOperations; i++) {
    const operation = generateOperation(content);

    operations.push(operation);

    content = operation.transformContent(content);
  }

  return operations;
}

module.exports = {
  content,
  operations
};

function generateString(length) {
  let string = '';

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let index = 0; index < length; index++) {
    string += characters.charAt(random(characters.length));
  }

  return string;
}

function generateOperation(string) {
  if (string === '') {
    return [
      generateEmptyOperation,
      generateInsertOperation
    ][random(2)](string);
  } else {
    return [
      generateEmptyOperation,
      generateInsertOperation,
      generateDeleteOperation
    ][random(3)](string);
  }
}

function generateEmptyOperation(string) {
  return new EmptyOperation();
}

function generateInsertOperation(string) {
  const stringLength = string.length,
        s = generateString(MAXIMUM_INSERT_OPERATION_LENGTH),
        n = random(stringLength + 1);

  return new InsertOperation(s, n);
}

function generateDeleteOperation(string) {
  const stringLength = string.length,
        n = random(stringLength),
        l = random(stringLength - n) + 1;

  return new DeleteOperation(l, n);
}
