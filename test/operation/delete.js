"use strict";

const chai = require("chai"),
      concur = require("../../lib/index"),  ///
      necessary = require("necessary");

const helpers = require("../helpers");

const { assert } = chai,
      { arrayUtilities } = necessary,
      { first } = arrayUtilities,
      { EmptyOperation, DeleteOperation, InsertOperation } = concur;

describe("lib/DeleteOperation", () => {
  describe("transform", () => {
    it("transforms an insert operation at position 2 to position 1", () => {
      const deleteOperation1 = DeleteOperation.fromLengthAndPosition(2, 1),
            insertOperation2 = InsertOperation.fromStringAndPosition("b", 2),
            transformedOperations = deleteOperation1.transformOperation(insertOperation2);

      assert.lengthOf(transformedOperations, 1);

      const firstTransformedOperation = first(transformedOperations),
            transformedOperation = firstTransformedOperation, ///
            transformedOperationJSON = transformedOperation.toJSON(),
            expectedTransformedOperation = InsertOperation.fromStringAndPosition("b", 1),
            expectedTransformedOperationJSON = expectedTransformedOperation.toJSON();

      assert.deepEqual(transformedOperationJSON, expectedTransformedOperationJSON)
    });

    it("transforms a delete operation of length 1 at position 2 to an empty operation", () => {
      const deleteOperation1 = DeleteOperation.fromLengthAndPosition(2, 1),
            deleteOperation2 = DeleteOperation.fromLengthAndPosition(1, 2),
            transformedOperations = deleteOperation1.transformOperation(deleteOperation2);

      assert.lengthOf(transformedOperations, 1);

      const firstTransformedOperation = first(transformedOperations),
            transformedOperation = firstTransformedOperation, ///
            transformedOperationJSON = transformedOperation.toJSON(),
            expectedTransformedOperation = EmptyOperation.fromNothing(),
            expectedTransformedOperationJSON = expectedTransformedOperation.toJSON();
  
      assert.deepEqual(transformedOperationJSON, expectedTransformedOperationJSON)
    });

    it("transforms a delete operation of length 2 at position 2 to a delete operation of length 1 at position 1", () => {
      const deleteOperation1 = DeleteOperation.fromLengthAndPosition(2, 1),
            deleteOperation2 = DeleteOperation.fromLengthAndPosition(2, 2),
            transformedOperations = deleteOperation1.transformOperation(deleteOperation2);

      assert.lengthOf(transformedOperations, 1);

      const firstTransformedOperation = first(transformedOperations),
            transformedOperation = firstTransformedOperation, ///
            transformedOperationJSON = transformedOperation.toJSON(),
            expectedTransformedOperation = DeleteOperation.fromLengthAndPosition(1, 1),
            expectedTransformedOperationJSON = expectedTransformedOperation.toJSON();

      assert.deepEqual(transformedOperationJSON, expectedTransformedOperationJSON)
    });

    it("transforms an insert operation at position 0, leaving it in the same position", () => {
      const deleteOperation1 = DeleteOperation.fromLengthAndPosition(1, 1),
            insertOperation2 = InsertOperation.fromStringAndPosition("b", 0),
            transformedOperations = deleteOperation1.transformOperation(insertOperation2);

      assert.lengthOf(transformedOperations, 1);

      const firstTransformedOperation = first(transformedOperations),
            transformedOperation = firstTransformedOperation, ///
            transformedOperationJSON = transformedOperation.toJSON(),
            expectedTransformedOperation = insertOperation2.clone(),
            expectedTransformedOperationJSON = expectedTransformedOperation.toJSON();

      assert.deepEqual(transformedOperationJSON, expectedTransformedOperationJSON)
    });

    it("transforms an insert operation at position 1, leaving it in the same position", () => {
      const deleteOperation1 = DeleteOperation.fromLengthAndPosition(1, 1),
            insertOperation2 = InsertOperation.fromStringAndPosition("b", 1),
            transformedOperations = deleteOperation1.transformOperation(insertOperation2);

      assert.lengthOf(transformedOperations, 1);

      const firstTransformedOperation = first(transformedOperations),
            transformedOperation = firstTransformedOperation, ///
            transformedOperationJSON = transformedOperation.toJSON(),
            expectedTransformedOperation = insertOperation2.clone(),
            expectedTransformedOperationJSON = expectedTransformedOperation.toJSON();

      assert.deepEqual(transformedOperationJSON, expectedTransformedOperationJSON)
    });

    it("transforms an insert operation at position 2 to position 1", () => {
      const deleteOperation1 = DeleteOperation.fromLengthAndPosition(1, 1),
            insertOperation2 = InsertOperation.fromStringAndPosition("b", 2),
            transformedOperations = deleteOperation1.transformOperation(insertOperation2);

      assert.lengthOf(transformedOperations, 1);

      const firstTransformedOperation = first(transformedOperations),
            transformedOperation = firstTransformedOperation, ///
            transformedOperationJSON = transformedOperation.toJSON(),
            expectedTransformedOperation = InsertOperation.fromStringAndPosition("b", 1),
            expectedTransformedOperationJSON = expectedTransformedOperation.toJSON();

      assert.deepEqual(transformedOperationJSON, expectedTransformedOperationJSON)
    });

    it("transforms an empty operation, leaving it the same", () => {
      const deleteOperation1 = DeleteOperation.fromLengthAndPosition(1, 1),
            emptyOperation2 = EmptyOperation.fromNothing(),
            transformedOperations = deleteOperation1.transformOperation(emptyOperation2);

      assert.lengthOf(transformedOperations, 1);

      const firstTransformedOperation = first(transformedOperations),
            transformedOperation = firstTransformedOperation, ///
            transformedOperationJSON = transformedOperation.toJSON(),
            expectedTransformedOperation = emptyOperation2.clone(),
            expectedTransformedOperationJSON = expectedTransformedOperation.toJSON();

      assert.deepEqual(transformedOperationJSON, expectedTransformedOperationJSON)
    });

    it("transforms a delete operation of length 1 at position 0, leaving it the same position", () => {
      const deleteOperation1 = DeleteOperation.fromLengthAndPosition(1, 1),
            deleteOperation2 = DeleteOperation.fromLengthAndPosition(1, 0),
            transformedOperations = deleteOperation1.transformOperation(deleteOperation2);

      assert.lengthOf(transformedOperations, 1);

      const firstTransformedOperation = first(transformedOperations),
            transformedOperation = firstTransformedOperation, ///
            transformedOperationJSON = transformedOperation.toJSON(),
            expectedTransformedOperation = deleteOperation2.clone(),
            expectedTransformedOperationJSON = expectedTransformedOperation.toJSON();

      assert.deepEqual(transformedOperationJSON, expectedTransformedOperationJSON)
    });

    it("transforms a delete operation of length 2 at position 0 to a delete operation of length 1 at position 0", () => {
      const deleteOperation1 = DeleteOperation.fromLengthAndPosition(1, 1),
            deleteOperation2 = DeleteOperation.fromLengthAndPosition(2, 0),
            transformedOperations = deleteOperation1.transformOperation(deleteOperation2);

      assert.lengthOf(transformedOperations, 1);

      const firstTransformedOperation = first(transformedOperations),
            transformedOperation = firstTransformedOperation, ///
            transformedOperationJSON = transformedOperation.toJSON(),
            expectedTransformedOperation = DeleteOperation.fromLengthAndPosition(1, 0),
            expectedTransformedOperationJSON = expectedTransformedOperation.toJSON();

      assert.deepEqual(transformedOperationJSON, expectedTransformedOperationJSON)
    });

    it("transforms a delete operation of length 3 at position 0 to a delete operation of length 2 at position 0", () => {
      const deleteOperation1 = DeleteOperation.fromLengthAndPosition(1, 1),
            deleteOperation2 = DeleteOperation.fromLengthAndPosition(3, 0),
            transformedOperations = deleteOperation1.transformOperation(deleteOperation2);

      assert.lengthOf(transformedOperations, 1);

      const firstTransformedOperation = first(transformedOperations),
            transformedOperation = firstTransformedOperation, ///
            transformedOperationJSON = transformedOperation.toJSON(),
            expectedTransformedOperation = DeleteOperation.fromLengthAndPosition(2, 0),
            expectedTransformedOperationJSON = expectedTransformedOperation.toJSON();

      assert.deepEqual(transformedOperationJSON, expectedTransformedOperationJSON)
    });

    it("transforms a delete operation of length 1 at position 1 to an empty operation", () => {
      const deleteOperation1 = DeleteOperation.fromLengthAndPosition(1, 1),
            deleteOperation2 = DeleteOperation.fromLengthAndPosition(1, 1),
            transformedOperations = deleteOperation1.transformOperation(deleteOperation2);

      assert.lengthOf(transformedOperations, 1);

      const firstTransformedOperation = first(transformedOperations),
            transformedOperation = firstTransformedOperation, ///
            transformedOperationJSON = transformedOperation.toJSON(),
            expectedTransformedOperation = EmptyOperation.fromNothing(),
            expectedTransformedOperationJSON = expectedTransformedOperation.toJSON();

      assert.deepEqual(transformedOperationJSON, expectedTransformedOperationJSON)
    });

    it("transforms a delete operation of length 2 at position 1 to a delete operation of length 1 at position 1", () => {
      const deleteOperation1 = DeleteOperation.fromLengthAndPosition(1, 1),
            deleteOperation2 = DeleteOperation.fromLengthAndPosition(2, 1),
            transformedOperations = deleteOperation1.transformOperation(deleteOperation2);

      assert.lengthOf(transformedOperations, 1);

      const firstTransformedOperation = first(transformedOperations),
            transformedOperation = firstTransformedOperation, ///
            transformedOperationJSON = transformedOperation.toJSON(),
            expectedTransformedOperation = DeleteOperation.fromLengthAndPosition(1, 1),
            expectedTransformedOperationJSON = expectedTransformedOperation.toJSON();

      assert.deepEqual(transformedOperationJSON, expectedTransformedOperationJSON)
    });

    it("transforms a delete operation of length 1 at position 2 to a delete operation of length 1 at position 1", () => {
      const deleteOperation1 = DeleteOperation.fromLengthAndPosition(1, 1),
            deleteOperation2 = DeleteOperation.fromLengthAndPosition(1, 2),
            transformedOperations = deleteOperation1.transformOperation(deleteOperation2);

      assert.lengthOf(transformedOperations, 1);

      const firstTransformedOperation = first(transformedOperations),
            transformedOperation = firstTransformedOperation, ///
            transformedOperationJSON = transformedOperation.toJSON(),
            expectedTransformedOperation = DeleteOperation.fromLengthAndPosition(1, 1),
            expectedTransformedOperationJSON = expectedTransformedOperation.toJSON();

      assert.deepEqual(transformedOperationJSON, expectedTransformedOperationJSON)
    });
  });

  describe("transformContent", () => {
    it("deletes the requisite characters from the content", () => {
      const content = helpers.content(10),
            deleteOperation = DeleteOperation.fromLengthAndPosition(6, 4),
            transformedContent = deleteOperation.transformContent(content),
            expectedContent = content.substring(0, 4);

      assert.equal(transformedContent, expectedContent);
    });
  });

  describe("fromJSON, toJSON", () => {
    it("transforms from and to JSON, leaving the operation unchanged", () => {
      const expectedJSON = {
				      "type": "delete",
              "length": 3,
              "position": 1
            },
            json = DeleteOperation.fromJSON(expectedJSON).toJSON();

      assert.deepEqual(json, expectedJSON);
    });
  });
});
