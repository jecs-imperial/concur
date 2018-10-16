'use strict';

const chai = require('chai');

const serialiseOperations = require('../../es6/operations/serialise');

const { assert } = chai;

describe('es6/serialiseOperations', function() {
  describe('fromJSON, toJSON', function() {
    it('transforms the operations from and to JSON, leaving the operations unchanged', function() {
      const expectedOperationsJSON = [{
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
            }],
            operationsJSON = serialiseOperations.toJSON(serialiseOperations.fromJSON(expectedOperationsJSON));

      assert.deepEqual(operationsJSON, expectedOperationsJSON);
    });
  });
});
