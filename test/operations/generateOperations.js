'use strict';

const chai = require('chai');

const generateOperations = require('../../es6/operations/generate');

const { assert } = chai;

describe('es6/operations/#generate', function() {
  it('generates a zero length sequence of operations if the contents passed are the same', function() {
    const contentA = 'asdf',
          contentB = contentA,
          generatedOperations = generateOperations(contentA, contentB);

    assert.lengthOf(generatedOperations, 0);
  });

  it('generates sequence containing one insert operation if the first content is a subset of the second', function() {
    const contentA = 'asdf',
          contentB = 'asdfxyz',
          generatedOperations = generateOperations(contentA, contentB);

    assert.lengthOf(generatedOperations, 1);

    const generatedOperation = generatedOperations[0],
          generatedOperationJSON = generatedOperation.toJSON(),
          expectedOperationJSON = {
            "type": "insert",
	          "string": "xyz",
	          "position": 4
          };

    assert.deepEqual(generatedOperationJSON, expectedOperationJSON);
  });

  it('generates sequence containing one delete operation if the second content is a subset of the first', function() {
    const contentA = 'asdfxyz',
          contentB = 'asdf',
          generatedOperations = generateOperations(contentA, contentB);

    assert.lengthOf(generatedOperations, 1);

    const generatedOperation = generatedOperations[0],
          generatedOperationJSON = generatedOperation.toJSON(),
          expectedOperationJSON = {
	          "type": "delete",
            "length": 3,
	          "position": 4
          };

    assert.deepEqual(generatedOperationJSON, expectedOperationJSON);
  });

  it('generates sequence containing one delete operation followed by an insert operation if the contents are different', function() {
    const contentA = 'asdfxyz',
          contentB = 'asdfcde',
          generatedOperations = generateOperations(contentA, contentB);

    assert.lengthOf(generatedOperations, 2);

    const firstGeneratedOperation = generatedOperations[0],
          secondGeneratedOperation = generatedOperations[1],
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
