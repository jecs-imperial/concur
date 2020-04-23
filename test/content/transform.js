"use strict";

const chai = require("chai"),
      concur = require("../../lib/index");  ///

const helpers = require("../helpers");

const { assert } = chai,
      { DeleteOperation, InsertOperation, transformContent, generateOperations } = concur;

describe("lib/transformContent", () => {
  describe("if the sequence of operations is of zero length", () => {
    it("leaves the content unchanged", () => {
      const content = helpers.content(),
            operations = [],
            transformedContent = transformContent(content, operations),
            expectedContent = content;  ///

      assert.equal(transformedContent, expectedContent);
    });
  });

  describe("if the sequence of operations is contains a single delete operation", () => {
    it("deletes the requisite characters", () => {
      const content = helpers.content(),
            deleteOperation = DeleteOperation.fromLengthAndPosition(2, 0),
            operations = [
              deleteOperation
            ],
            transformedContent = transformContent(content, operations),
            expectedContent = content.substring(2);

      assert.equal(transformedContent, expectedContent);
    });
  });

  describe("if the sequence of operations is contains a single insert operation", () => {
    it("inserts the requisite characters", () => {
      const content = helpers.content(),
            insertOperation = InsertOperation.fromStringAndPosition("xyz", 0),
            operations = [
              insertOperation
            ],
            transformedContent = transformContent(content, operations),
            expectedContent = `xyz${content}`;

      assert.equal(transformedContent, expectedContent);
    });
  });

  describe("if the sequence of operations is generated from the working and editable contents", () => {
    it("returns the result of applying those operations to the working content", () => {
      const editableContent = helpers.content(),
            workingContent = helpers.content(),
            operations = generateOperations(workingContent, editableContent),
            transformedWorkingContent = transformContent(workingContent, operations),
            expectedContent = editableContent;  ///

      assert.equal(transformedWorkingContent, expectedContent);
    });
  });
});
