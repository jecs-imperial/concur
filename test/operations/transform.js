'use strict';

const chai = require('chai');

const helpers = require('../helpers'),
      transformContent = require('../../es6/content/transform'),
      transformOperations = require('../../es6/operations/transform'),
      serialiseOperations = require('../../es6/operations/serialise');

const { assert } = chai;

describe('es6/transformOperations', function() {
  describe('for two empty sequences of operations', function() {
    it('The intentions are preserved', function() {
      const firstOperationsJSON = [],
            secondOperationsJSON = [],
            firstOperations = serialiseOperations.fromJSON(firstOperationsJSON),
            secondOperations = serialiseOperations.fromJSON(secondOperationsJSON);

      assertIntentionsPreserved(firstOperations, secondOperations);
    });
  });

  describe('for a sequence containing one operation and an empty sequence', function() {
    it('The intentions are preserved', function() {
      const firstOperationsJSON = [{
              "type": "insert",
              "string": "xyz",
              "position": 1
            }],
            secondOperationsJSON = [],
            firstOperations = serialiseOperations.fromJSON(firstOperationsJSON),
            secondOperations = serialiseOperations.fromJSON(secondOperationsJSON);

      assertIntentionsPreserved(firstOperations, secondOperations);
    });
  });

  describe('for two sequences each containing one operation', function() {
    it('The intentions are preserved', function() {
      const firstOperationsJSON = [{
              "type": "insert",
              "string": "xyz",
              "position": 1
            }],
            secondOperationsJSON = [{
              "type": "delete",
              "length": 2,
              "position": 1
            }],
            firstOperations = serialiseOperations.fromJSON(firstOperationsJSON),
            secondOperations = serialiseOperations.fromJSON(secondOperationsJSON);

      assertIntentionsPreserved(firstOperations, secondOperations);
    });
  });

  describe('for a sequence containing one operation and a sequence containing two operations', function() {
    it('The intentions are preserved', function() {
      const firstOperationsJSON = [{
              "type": "insert",
              "string": "xyz",
              "position": 1,
            }],
            secondOperationsJSON = [{
              "type": "insert",
              "string": "abc",
              "position": 3
            },
            {
              "type": "delete",
              "length": 2,
              "position": 1,
            }],
            firstOperations = serialiseOperations.fromJSON(firstOperationsJSON),
            secondOperations = serialiseOperations.fromJSON(secondOperationsJSON);

      assertIntentionsPreserved(firstOperations, secondOperations);
    });
  });

  describe('for two sequences each containing two operations', function() {
    it('The intentions are preserved', function() {
      const firstOperationsJSON = [{
              "type": "delete",
              "length": 6,
              "position": 0
            },
            {
              "type": "insert",
              "string": "JQ",
              "position": 0
            }],
            secondOperationsJSON = [{
              "type": "delete",
              "length": 4,
              "position": 0
            },
            {
              "type": "insert",
              "string": "bkW",
              "position": 0
            }],
            firstOperations = serialiseOperations.fromJSON(firstOperationsJSON),
            secondOperations = serialiseOperations.fromJSON(secondOperationsJSON);

      assertIntentionsPreserved(firstOperations, secondOperations);
    });
  });

  describe('for two sequences each containing a hundred operations', function() {
    it('The intentions are preserved', function() {
      const content = helpers.content(100),
            firstOperations = helpers.operations(content, 100),
            secondOperations = helpers.operations(content, 100);

      assertIntentionsPreserved(firstOperations, secondOperations);
    });
  });
});

function assertIntentionsPreserved(firstOperations, secondOperations) {
  const content = helpers.content(100),
        transformedFirstOperations = transformOperations(firstOperations, secondOperations),
        transformedSecondOperations = transformOperations(secondOperations, firstOperations);

  firstOperations = firstOperations.concat(transformedSecondOperations);
  secondOperations = secondOperations.concat(transformedFirstOperations);

  const firstTransformedContent = transformContent(content, firstOperations),
        secondTransformedContent = transformContent(content, secondOperations);

  assert.equal(firstTransformedContent, secondTransformedContent);
}
