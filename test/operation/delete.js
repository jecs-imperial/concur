'use strict';

const chai = require('chai'),
      necessary = require('necessary');

const EmptyOperation = require('../../es6/operation/empty'),
      DeleteOperation = require('../../es6/operation/delete'),
      InsertOperation = require('../../es6/operation/insert');

const { assert } = chai,
      { arrayUtilities } = necessary,
      { first } = arrayUtilities;

describe('es6/DeleteOperation', function() {
  describe('#transform', function() {
    it('transforms an insert operation at position 2 to position 1', function() {
      const deleteOperation1 = DeleteOperation.fromLengthAndPosition(2, 1),
            insertOperation2 = InsertOperation.fromStringAndPosition('b', 2),
            transformedOperations = deleteOperation1.transformOperation(insertOperation2);

      assert.lengthOf(transformedOperations, 1);

      const firstTransformedOperation = first(transformedOperations),
            transformedOperation = firstTransformedOperation, ///
            transformedOperationJSON = transformedOperation.toJSON(),
            expectedTransformedOperation = InsertOperation.fromStringAndPosition('b', 1),
            expectedTransformedOperationJSON = expectedTransformedOperation.toJSON();

      assert.deepEqual(transformedOperationJSON, expectedTransformedOperationJSON)
    });

    it('transforms a delete operation of length 1 at position 2 to an empty operation', function() {
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

    it('transforms a delete operation of length 2 at position 2 to a delete operation of length 1 at position 1', function() {
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

    it('transforms an insert operation at position 0, leaving it in the same position', function() {
      const deleteOperation1 = DeleteOperation.fromLengthAndPosition(1, 1),
            insertOperation2 = InsertOperation.fromStringAndPosition('b', 0),
            transformedOperations = deleteOperation1.transformOperation(insertOperation2);

      assert.lengthOf(transformedOperations, 1);

      const firstTransformedOperation = first(transformedOperations),
            transformedOperation = firstTransformedOperation, ///
            transformedOperationJSON = transformedOperation.toJSON(),
            expectedTransformedOperation = insertOperation2.clone(),
            expectedTransformedOperationJSON = expectedTransformedOperation.toJSON();

      assert.deepEqual(transformedOperationJSON, expectedTransformedOperationJSON)
    });

    it('transforms an insert operation at position 1, leaving it in the same position', function() {
      const deleteOperation1 = DeleteOperation.fromLengthAndPosition(1, 1),
            insertOperation2 = InsertOperation.fromStringAndPosition('b', 1),
            transformedOperations = deleteOperation1.transformOperation(insertOperation2);

      assert.lengthOf(transformedOperations, 1);

      const firstTransformedOperation = first(transformedOperations),
            transformedOperation = firstTransformedOperation, ///
            transformedOperationJSON = transformedOperation.toJSON(),
            expectedTransformedOperation = insertOperation2.clone(),
            expectedTransformedOperationJSON = expectedTransformedOperation.toJSON();

      assert.deepEqual(transformedOperationJSON, expectedTransformedOperationJSON)
    });

    it('transforms an insert operation at position 2 to position 1', function() {
      const deleteOperation1 = DeleteOperation.fromLengthAndPosition(1, 1),
            insertOperation2 = InsertOperation.fromStringAndPosition('b', 2),
            transformedOperations = deleteOperation1.transformOperation(insertOperation2);

      assert.lengthOf(transformedOperations, 1);

      const firstTransformedOperation = first(transformedOperations),
            transformedOperation = firstTransformedOperation, ///
            transformedOperationJSON = transformedOperation.toJSON(),
            expectedTransformedOperation = InsertOperation.fromStringAndPosition('b', 1),
            expectedTransformedOperationJSON = expectedTransformedOperation.toJSON();

      assert.deepEqual(transformedOperationJSON, expectedTransformedOperationJSON)
    });

    it('transforms an empty operation, leaving it the same', function() {
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

    it('transforms a delete operation of length 1 at position 0, leaving it the same position', function() {
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

    it('transforms a delete operation of length 2 at position 0 to a delete operation of length 1 at position 0', function() {
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

    it('transforms a delete operation of length 3 at position 0 to a delete operation of length 2 at position 0', function() {
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

    it('transforms a delete operation of length 1 at position 1 to an empty operation', function() {
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

    it('transforms a delete operation of length 2 at position 1 to a delete operation of length 1 at position 1', function() {
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

    it('transforms a delete operation of length 1 at position 2 to a delete operation of length 1 at position 1', function() {
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

  describe('#transformContent', function() {
    it('deletes the relevant characters from the content', function() {
      const content = 'asdffdghasdf',
            deleteOperation = DeleteOperation.fromLengthAndPosition(3, 4),
            transformedContent = deleteOperation.transformContent(content),
            expectedContent = 'asdfhasdf';

      assert.equal(transformedContent, expectedContent);
    });
  });

  describe('#fromJSON, toJSON', function() {
    it('transforms from and to JSON, leaving the operation unchanged', function() {
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
