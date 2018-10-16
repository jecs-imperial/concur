'use strict';

const chai = require('chai'),
      necessary = require('necessary');

const generateOperations = require('../../es6/operations/generate');

const { assert } = chai,
      { arrayUtilities } = necessary,
      { first, second } = arrayUtilities;

describe('es6/generateOperations', function() {
  it('generates a zero length sequence of operations if the working and editable content are the same', function() {
    const workingContent = 'asdf',  ///
          editableContent = workingContent,
          operations = generateOperations(workingContent, editableContent);

    assert.lengthOf(operations, 0);
  });

  it('generates sequence containing one insert operation if the the working content is a subset of the editable content', function() {
    const workingContent = 'asdf',
          editableContent = 'asdfxyz',
          operations = generateOperations(workingContent, editableContent);

    assert.lengthOf(operations, 1);

    const firstOperation = first(operations),
          operation = firstOperation, ///
          operationJSON = operation.toJSON(),
          expectedOperationJSON = {
            "type": "insert",
	          "string": "xyz",
	          "position": 4
          };

    assert.deepEqual(operationJSON, expectedOperationJSON);
  });

  it('generates sequence containing one delete operation if the editable content is a subset of the the working content', function() {
    const workingContent = 'asdfxyz',
          editableContent = 'asdf',
          operations = generateOperations(workingContent, editableContent);

    assert.lengthOf(operations, 1);

    const firstOperation = first(operations),
          operation = firstOperation, ///
          operationJSON = operation.toJSON(),
          expectedOperationJSON = {
	          "type": "delete",
            "length": 3,
	          "position": 4
          };

    assert.deepEqual(operationJSON, expectedOperationJSON);
  });

  it('generates sequence containing one delete operation followed by an insert operation if the the working and editable content are different', function() {
    const workingContent = 'asdfxyz',
          editableContent = 'asdfcde',
          operations = generateOperations(workingContent, editableContent);

    assert.lengthOf(operations, 2);

    const firstGeneratedOperation = first(operations),
          secondGeneratedOperation = second(operations),
          firstGeneratedOperationJSON = firstGeneratedOperation.toJSON(),
          secondGeneratedOperationJSON = secondGeneratedOperation.toJSON(),
          firstExpectedOperationJSON = {
	          "type": "delete",
            "length": 3,
	          "position": 4
          },
          secondExpectedOperationJSON = {
	          "type": "insert",
            "string": "cde",
	          "position": 4
          };

    assert.deepEqual(firstGeneratedOperationJSON, firstExpectedOperationJSON);
    assert.deepEqual(secondGeneratedOperationJSON, secondExpectedOperationJSON);
  });
});
