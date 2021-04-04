"use strict";

const { assert } = require("chai"),
      { transformContent, operationsFromJSON, transformOperations } = require("../../lib/main");  ///

const helpers = require("../helpers");

describe("lib/transformOperations", () => {
  describe("for two empty sequences of operations", () => {
    it("The intentions are preserved", () => {
      const firstOperationsJSON = [],
            secondOperationsJSON = [],
            firstOperations = operationsFromJSON(firstOperationsJSON),
            secondOperations = operationsFromJSON(secondOperationsJSON);

      assertIntentionsPreserved(firstOperations, secondOperations);
    });
  });

  describe("for a sequence containing one operation and an empty sequence", () => {
    it("The intentions are preserved", () => {
      const firstOperationsJSON = [{
              "type": "insert",
              "string": "xyz",
              "position": 1
            }],
            secondOperationsJSON = [],
            firstOperations = operationsFromJSON(firstOperationsJSON),
            secondOperations = operationsFromJSON(secondOperationsJSON);

      assertIntentionsPreserved(firstOperations, secondOperations);
    });
  });

  describe("for two sequences each containing one operation", () => {
    it("The intentions are preserved", () => {
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
            firstOperations = operationsFromJSON(firstOperationsJSON),
            secondOperations = operationsFromJSON(secondOperationsJSON);

      assertIntentionsPreserved(firstOperations, secondOperations);
    });
  });

  describe("for a sequence containing one operation and a sequence containing two operations", () => {
    it("The intentions are preserved", () => {
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
            firstOperations = operationsFromJSON(firstOperationsJSON),
            secondOperations = operationsFromJSON(secondOperationsJSON);

      assertIntentionsPreserved(firstOperations, secondOperations);
    });
  });

  describe("for two sequences each containing two operations", () => {
    it("The intentions are preserved", () => {
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
            firstOperations = operationsFromJSON(firstOperationsJSON),
            secondOperations = operationsFromJSON(secondOperationsJSON);

      assertIntentionsPreserved(firstOperations, secondOperations);
    });
  });

  describe("for two sequences each containing a hundred operations", () => {
    it("The intentions are preserved", () => {
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
