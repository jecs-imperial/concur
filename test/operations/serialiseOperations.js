'use strict';

const chai = require('chai');

const serialiseOperations = require('../../es6/operations/serialise');

const { assert } = chai;

describe('es6/operations/#serialise', function() {
  describe('#fromJSON, toJSON', function() {
    it('transforms from and to JSON, leaving the operations unchanged', function() {
      const operationsJSON = [
              {
	              "type": "insert",
	              "string": "xyz",
	              "position": 1
              },
              {
	              "type": "delete",
	              "length": 2,
	              "position": 1
              },
              {
              	"type": "empty"
              }
            ],
            resultantOperations = serialiseOperations.toJSON(serialiseOperations.fromJSON(operationsJSON)),
            expectedOperations = resultantOperations;

      assert.deepEqual(resultantOperations, expectedOperations);

      assert.isTrue(true);
    });
  });
});
