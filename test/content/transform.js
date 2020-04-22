"use strict";

const chai = require("chai");

const helpers = require("../helpers"),
      DeleteOperation = require("../../es6/operation/delete"),
      InsertOperation = require("../../es6/operation/insert"),
      transformContent = require("../../es6/content/transform"),
      generateOperations = require("../../es6/operations/generate");

const { assert } = chai;

describe("es6/transformContent", function() {
  describe("if the sequence of operations is of zero length", function() {
    it("leaves the content unchanged", function() {
      const content = helpers.content(),
            operations = [],
            transformedContent = transformContent(content, operations),
            expectedContent = content;  ///

      assert.equal(transformedContent, expectedContent);
    });
  });

  describe("if the sequence of operations is contains a single delete operation", function() {
    it("deletes the requisite characters", function() {
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

  describe("if the sequence of operations is contains a single insert operation", function() {
    it("inserts the requisite characters", function() {
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

  describe("if the sequence of operations is generated from the working and editable contents", function() {
    it("returns the result of applying those operations to the working content", function() {
      const editableContent = helpers.content(),
            workingContent = helpers.content(),
            operations = generateOperations(workingContent, editableContent),
            transformedWorkingContent = transformContent(workingContent, operations),
            expectedContent = editableContent;  ///

      assert.equal(transformedWorkingContent, expectedContent);
    });
  });
});
