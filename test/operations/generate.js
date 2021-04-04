"use strict";

const { assert } = require("chai"),
      { arrayUtilities } = require("necessary"),
      { types, InsertOperation, DeleteOperation, generateOperations } = require("../../lib/main");  ///

const helpers = require("../helpers");

const{ first, second } = arrayUtilities,
     { insertType, deleteType } = types;

describe("lib/generateOperations", () => {
  describe("if the working and editable contents are the same", () => {
    it("generates a zero length sequence of operations", () => {
      const workingContent = helpers.content(),
            editableContent = workingContent,
            operations = generateOperations(workingContent, editableContent);

      assert.lengthOf(operations, 0);
    });
  });

  describe("if the the working content is a subset of the editable content", () => {
    it("generates a sequence of operations containing an insert operation", () => {
      const workingContent = helpers.content(),
            editableContent = `123${workingContent}`,
            operations = generateOperations(workingContent, editableContent);

      assert.lengthOf(operations, 1);

      const firstOperation = first(operations),
            insertOperation = InsertOperation.fromStringAndPosition("123", 0),
            operation = firstOperation, ///
            expectedOperation = insertOperation,  ///
            operationJSON = operation.toJSON(),
            expectedOperationJSON = expectedOperation.toJSON();

      assert.deepEqual(operationJSON, expectedOperationJSON);
    });
  });

  describe("if the editable content is a subset of the the working content", () => {
    it("generates sequence of operations containing a delete operation", () => {
      const editableContent = helpers.content(),
            workingContent = `xyz${editableContent}`,
            operations = generateOperations(workingContent, editableContent);

      assert.lengthOf(operations, 1);

      const firstOperation = first(operations),
            deleteOperation = DeleteOperation.fromLengthAndPosition(3, 0),
            operation = firstOperation, ///
            expectedOperation = deleteOperation,  ///
            operationJSON = operation.toJSON(),
            expectedOperationJSON = expectedOperation.toJSON();

      assert.deepEqual(operationJSON, expectedOperationJSON);
    });
  });

  describe("if the the working and editable contents are different", () => {
    it("generates sequence of operations containing one delete operation followed by an insert operation", () => {
      const workingContent = helpers.content(),
            editableContent = helpers.content(),
            operations = generateOperations(workingContent, editableContent);

      assert.lengthOf(operations, 2);

      const firstOperation = first(operations),
            secondOperation = second(operations),
            firstOperationJSON = firstOperation.toJSON(),
            secondOperationJSON = secondOperation.toJSON(),
            firstOperationType = firstOperationJSON["type"],
            secondOperationType = secondOperationJSON["type"],
            expectedFirstOperationType = deleteType,  ///
            expectedSecondOperationType = insertType; ///

      assert.deepEqual(firstOperationType, expectedFirstOperationType);
      assert.deepEqual(secondOperationType, expectedSecondOperationType);
    });
  });
});
