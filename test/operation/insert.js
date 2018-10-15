'use strict';

const chai = require('chai'),
      necessary = require('necessary');

const EmptyOperation = require('../../es6/operation/empty'),
      DeleteOperation = require('../../es6/operation/delete'),
      InsertOperation = require('../../es6/operation/insert');

const { assert } = chai,
      { arrayUtilities } = necessary,
      { first, second } = arrayUtilities;

describe('es6/InsertOperation', function() {
  describe('#transform', function() {
    it('transforms a second insert operation at position 0, leaving it in the same position', function() {
      const insertOperation1 = InsertOperation.fromStringAndPosition('a', 1),
            insertOperation2 = InsertOperation.fromStringAndPosition('b', 0),
            transformedOperations = insertOperation1.transformOperation(insertOperation2);

      assert.lengthOf(transformedOperations, 1);

      const firstTransformedOperation = first(transformedOperations),
            transformedOperation = firstTransformedOperation, ///
            transformedOperationJSON = transformedOperation.toJSON(),
            expectedTransformedOperation = insertOperation2.clone(),
            expectedTransformedOperationJSON = expectedTransformedOperation.toJSON();

      assert.deepEqual(transformedOperationJSON, expectedTransformedOperationJSON)
    });

    it('transforms a second, lexicographically lesser insert operation at position 1, leaving it in the same position', function() {
      const insertOperation1 = InsertOperation.fromStringAndPosition('a', 1),
            insertOperation2 = InsertOperation.fromStringAndPosition(' ', 1),
            transformedOperations = insertOperation1.transformOperation(insertOperation2);

      assert.lengthOf(transformedOperations, 1);

      const firstTransformedOperation = first(transformedOperations),
            transformedOperation = firstTransformedOperation, ///
            transformedOperationJSON = transformedOperation.toJSON(),
            expectedTransformedOperation = insertOperation2.clone(),
            expectedTransformedOperationJSON = expectedTransformedOperation.toJSON();

      assert.deepEqual(transformedOperationJSON, expectedTransformedOperationJSON)
    });

    it('transforms a second, equal insert operation, leaving it in the same position', function() {
      const insertOperation1 = InsertOperation.fromStringAndPosition('a', 1),
            insertOperation2 = insertOperation1.clone(),
            transformedOperations = insertOperation1.transformOperation(insertOperation2);

      assert.lengthOf(transformedOperations, 1);

      const firstTransformedOperation = first(transformedOperations),
            transformedOperation = firstTransformedOperation, ///
            transformedOperationJSON = transformedOperation.toJSON(),
            expectedTransformedOperation = insertOperation1.clone(),
            expectedTransformedOperationJSON = expectedTransformedOperation.toJSON();

      assert.deepEqual(transformedOperationJSON, expectedTransformedOperationJSON)
    });

    it('transforms a second, lexicographically greater insert operation at position 1 to position 2', function() {
      const insertOperation1 = InsertOperation.fromStringAndPosition('a', 1),
            insertOperation2 = InsertOperation.fromStringAndPosition('b', 1),
            transformedOperations = insertOperation1.transformOperation(insertOperation2);

      assert.lengthOf(transformedOperations, 1);

      const firstTransformedOperation = first(transformedOperations),
            transformedOperation = firstTransformedOperation, ///
            transformedOperationJSON = transformedOperation.toJSON(),
            expectedTransformedOperation = InsertOperation.fromStringAndPosition('b', 2),
            expectedTransformedOperationJSON = expectedTransformedOperation.toJSON();

      assert.deepEqual(transformedOperationJSON, expectedTransformedOperationJSON)
    });

    it('transforms a second insert operation at position 2 to position 3', function() {
      const insertOperation1 = InsertOperation.fromStringAndPosition('a', 1),
            insertOperation2 = InsertOperation.fromStringAndPosition('b', 2),
            transformedOperations = insertOperation1.transformOperation(insertOperation2);

      assert.lengthOf(transformedOperations, 1);

      const firstTransformedOperation = first(transformedOperations),
            transformedOperation = firstTransformedOperation, ///
            transformedOperationJSON = transformedOperation.toJSON(),
            expectedTransformedOperation = InsertOperation.fromStringAndPosition('b', 3),
            expectedTransformedOperationJSON = expectedTransformedOperation.toJSON();

      assert.deepEqual(transformedOperationJSON, expectedTransformedOperationJSON)
    });

    it('transforms an empty operation, leaving it the same', function() {
      const insertOperation1 = InsertOperation.fromStringAndPosition('a', 1),
            emptyOperation2 = EmptyOperation.fromNothing(),
            transformedOperations = insertOperation1.transformOperation(emptyOperation2);

      assert.lengthOf(transformedOperations, 1);

      const firstTransformedOperation = first(transformedOperations),
            transformedOperation = firstTransformedOperation, ///
            transformedOperationJSON = transformedOperation.toJSON(),
            expectedTransformedOperation = emptyOperation2.clone(),
            expectedTransformedOperationJSON = expectedTransformedOperation.toJSON();

      assert.deepEqual(transformedOperationJSON, expectedTransformedOperationJSON)
    });

    it('transforms a delete operation at position 0 of length 1, leaving it the same position', function() {
      const insertOperation1 = InsertOperation.fromStringAndPosition('a', 1),
            deleteOperation2 = DeleteOperation.fromLengthAndPosition(1, 0),
            transformedOperations = insertOperation1.transformOperation(deleteOperation2);

      assert.lengthOf(transformedOperations, 1);

      const firstTransformedOperation = first(transformedOperations),
            transformedOperation = firstTransformedOperation, ///
            transformedOperationJSON = transformedOperation.toJSON(),
            expectedTransformedOperation = deleteOperation2.clone(),
            expectedTransformedOperationJSON = expectedTransformedOperation.toJSON();

      assert.deepEqual(transformedOperationJSON, expectedTransformedOperationJSON);
    });

    it('transforms a delete operation at position 0 of length 2, splitting it into two delete operations of length 1, the first at position 0 and the second at position 1', function() {
      const insertOperation1 = InsertOperation.fromStringAndPosition('a', 1),
            deleteOperation2 = DeleteOperation.fromLengthAndPosition(2, 0),
            transformedOperations = insertOperation1.transformOperation(deleteOperation2);

      assert.lengthOf(transformedOperations, 2);

      const firstTransformedOperation = first(transformedOperations),
            secondTransformedOperation = second(transformedOperations),
            firstTransformedOperationJSON = firstTransformedOperation.toJSON(),
            secondTransformedOperationJSON = secondTransformedOperation.toJSON(),
            firstExpectedTransformedOperation = DeleteOperation.fromLengthAndPosition(1, 0),
            secondExpectedTransformedOperation = DeleteOperation.fromLengthAndPosition(1, 1),
            firstExpectedTransformedOperationJSON = firstExpectedTransformedOperation.toJSON(),
            secondExpectedTransformedOperationJSON = secondExpectedTransformedOperation.toJSON();

      assert.deepEqual(firstTransformedOperationJSON, firstExpectedTransformedOperationJSON);
      assert.deepEqual(secondTransformedOperationJSON, secondExpectedTransformedOperationJSON);
    });

    it('transforms a delete operation at position 1 of length 1 to position 2', function() {
      const insertOperation1 = InsertOperation.fromStringAndPosition('a', 1),
            deleteOperation2 = DeleteOperation.fromLengthAndPosition(1, 1),
            transformedOperations = insertOperation1.transformOperation(deleteOperation2);

      assert.lengthOf(transformedOperations, 1);

      const firstTransformedOperation = first(transformedOperations),
            transformedOperation = firstTransformedOperation, ///
            transformedOperationJSON = transformedOperation.toJSON(),
            expectedTransformedOperation = DeleteOperation.fromLengthAndPosition(1, 2),
            expectedTransformedOperationJSON = expectedTransformedOperation.toJSON();

      assert.deepEqual(transformedOperationJSON, expectedTransformedOperationJSON);
    });

    it('transforms a delete operation at position 2 of length 1 to position 3', function() {
      const insertOperation1 = InsertOperation.fromStringAndPosition('a', 1),
            deleteOperation2 = DeleteOperation.fromLengthAndPosition(1, 2),
            transformedOperations = insertOperation1.transformOperation(deleteOperation2);

      assert.lengthOf(transformedOperations, 1);

      const firstTransformedOperation = first(transformedOperations),
            transformedOperation = firstTransformedOperation, ///
            transformedOperationJSON = transformedOperation.toJSON(),
            expectedTransformedOperation = DeleteOperation.fromLengthAndPosition(1, 3),
            expectedTransformedOperationJSON = expectedTransformedOperation.toJSON();

      assert.deepEqual(transformedOperationJSON, expectedTransformedOperationJSON);
    });
  });

  describe('#transformContent', function() {
    it('inserts its characters in the the relevant place in the content', function() {
      const content = 'asdffdghasdf',
          emptyOperation = InsertOperation.fromStringAndPosition('123', 4),
          transformedContent = emptyOperation.transformContent(content),
          expectedContent = 'asdf123fdghasdf';

      assert.equal(transformedContent, expectedContent);
    });
  });

  describe('#fromJSON, toJSON', function() {
    it('transforms from and to JSON, leaving the operation unchanged', function() {
      const expectedJSON = {
            "type": "insert",
            "string": "a",
            "position": 1
          },
          json = InsertOperation.fromJSON(expectedJSON).toJSON();

      assert.deepEqual(json, expectedJSON);
    });
  });
});
