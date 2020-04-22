"use strict";

const chai = require("chai"),
      necessary = require("necessary");

const helpers = require("../helpers"),
      EmptyOperation = require("../../es6/operation/empty"),
      DeleteOperation = require("../../es6/operation/delete"),
      InsertOperation = require("../../es6/operation/insert");

const { assert } = chai,
      { arrayUtilities } = necessary,
      { first } = arrayUtilities;

describe("es6/EmptyOperation", () => {
  describe("transform", () => {
    it("transforms an insert operation, leaving it the same", () => {
      const emptyOperation1 = EmptyOperation.fromNothing(),
            insertOperation2 = InsertOperation.fromStringAndPosition(0, "b"),
            transformedOperations = emptyOperation1.transformOperation(insertOperation2);

      assert.lengthOf(transformedOperations, 1);

      const firstTransformedOperation = first(transformedOperations),
            transformedOperation = firstTransformedOperation, ///
            transformedOperationJSON = transformedOperation.toJSON(),
            expectedTransformedOperation = insertOperation2.clone(),
            expectedTransformedOperationJSON = expectedTransformedOperation.toJSON();

      assert.deepEqual(transformedOperationJSON, expectedTransformedOperationJSON)
    });

    it("transforms a second empty operation, leaving it the same", () => {
      const emptyOperation1 = EmptyOperation.fromNothing(),
            emptyOperation2 = EmptyOperation.fromNothing(),
            transformedOperations = emptyOperation1.transformOperation(emptyOperation2);

      assert.lengthOf(transformedOperations, 1);

      const firstTransformedOperation = first(transformedOperations),
            transformedOperation = firstTransformedOperation, ///
            transformedOperationJSON = transformedOperation.toJSON(),
            expectedTransformedOperation = emptyOperation2.clone(),
            expectedTransformedOperationJSON = expectedTransformedOperation.toJSON();

      assert.deepEqual(transformedOperationJSON, expectedTransformedOperationJSON)
    });

    it("transforms a delete operation, leaving it the same", () => {
      const emptyOperation1 = EmptyOperation.fromNothing(),
            deleteOperation2 = DeleteOperation.fromLengthAndPosition(0, 1),
            transformedOperations = emptyOperation1.transformOperation(deleteOperation2);

      assert.lengthOf(transformedOperations, 1);

      const firstTransformedOperation = first(transformedOperations),
            transformedOperation = firstTransformedOperation, ///
            transformedOperationJSON = transformedOperation.toJSON(),
            expectedTransformedOperation = deleteOperation2.clone(),
            expectedTransformedOperationJSON = expectedTransformedOperation.toJSON();

      assert.deepEqual(transformedOperationJSON, expectedTransformedOperationJSON);
    });
  });

  describe("transformContent", () => {
    it("leaves the content unchanged", () => {
      const content = helpers.content(),
            emptyOperation = EmptyOperation.fromNothing(),
            transformedContent = emptyOperation.transformContent(content),
            expectedContent = content;

      assert.equal(transformedContent, expectedContent);
    });
  });

  describe("fromJSON, toJSON", () => {
    it("transforms from and to JSON, leaving the operation unchanged", () => {
      const expectedJSON = {
              "type": "empty"
            },
            json = EmptyOperation.fromJSON(expectedJSON).toJSON();

      assert.deepEqual(json, expectedJSON);
    });
  });
});
