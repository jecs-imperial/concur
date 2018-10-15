'use strict';

const chai = require('chai'),
      necessary = require('necessary');

const EmptyOperation = require('../../es6/operation/empty'),
      DeleteOperation = require('../../es6/operation/delete'),
      InsertOperation = require('../../es6/operation/insert');

const { assert } = chai,
      { arrayUtilities } = necessary,
      { first } = arrayUtilities;

describe('es6/EmptyOperation', function() {
  describe('#transform', function() {
    it('transforms an insert operation, leaving it the same', function() {
      const emptyOperation1 = EmptyOperation.fromNothing(),
            insertOperation2 = InsertOperation.fromStringAndPosition(0, 'b'),
            transformedOperations = emptyOperation1.transformOperation(insertOperation2);

      assert.lengthOf(transformedOperations, 1);

      const firstTransformedOperation = first(transformedOperations),
            transformedOperation = firstTransformedOperation, ///
            transformedOperationJSON = transformedOperation.toJSON(),
            expectedTransformedOperation = insertOperation2.clone(),
            expectedTransformedOperationJSON = expectedTransformedOperation.toJSON();

      assert.deepEqual(transformedOperationJSON, expectedTransformedOperationJSON)
    });

    it('transforms a second empty operation, leaving it the same', function() {
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

    it('transforms a delete operation, leaving it the same', function() {
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

  describe('#transformContent', function() {
    it('leaves the content unchanged', function() {
      const content = 'asdffdghasdf',
            emptyOperation = EmptyOperation.fromNothing(),
            transformedContent = emptyOperation.transformContent(content),
            expectedContent = content;

      assert.equal(transformedContent, expectedContent);
    });
  });

  describe('#fromJSON, toJSON', function() {
    it('transforms from and to JSON, leaving the operation unchanged', function() {
      const expectedJSON = {
              "type": "empty"
            },
            json = EmptyOperation.fromJSON(expectedJSON).toJSON();

      assert.deepEqual(json, expectedJSON);
    });
  });
});
