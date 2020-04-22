"use strict";

const randomSeed = require("random-seed");

const EmptyOperation = require("../es6/operation/empty"),
      InsertOperation = require("../es6/operation/insert"),
      DeleteOperation = require("../es6/operation/delete");

const DEFAULT_CONTENT_LENGTH = 4,
      DEFAULT_NUMBER_OF_OPERATIONS = 2,
      MAXIMUM_INSERT_OPERATION_LENGTH = 4;

const random = randomSeed.create(".");

function content(length = DEFAULT_CONTENT_LENGTH) {
  const string = generateString(length),
        content = string; ///

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
  let string = "";

  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let index = 0; index < length; index++) {
    string += characters.charAt(random(characters.length));
  }

  return string;
}

function generateOperation(string) {
  if (string === "") {
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
  return EmptyOperation.fromNothing();
}

function generateInsertOperation(string) {
  const stringLength = string.length,
        position = random(stringLength + 1);

  string = generateString(MAXIMUM_INSERT_OPERATION_LENGTH); ///

  return InsertOperation.fromStringAndPosition(string, position);
}

function generateDeleteOperation(string) {
  const stringLength = string.length,
        position = random(stringLength),
        length = random(stringLength - position) + 1;

  return DeleteOperation.fromLengthAndPosition(length, position);
}
