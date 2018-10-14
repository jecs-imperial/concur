'use strict';

const chai = require('chai');

const transformContent = require('../../es6/content/transform'),
      generateOperations = require('../../es6/operations/generate'),
      serialiseOperations = require('../../es6/operations/serialise');

const { assert } = chai;

describe('es6/content/#transform', function() {
  it('leaves the content unchanged if the sequence of operations is zero length', function() {
    const content = 'asdf',
          operations = [],
          transformedContent = transformContent(content, operations),
          expectedContent = content;

    assert.equal(transformedContent, expectedContent);
  });

  it('results in a content with the given characters deleted if the sequence of operations is contains a single delete operation', function() {
    const content = 'asdf',
          operationsJSON = [{
	          "type": "delete",
            "length": 2,
            "position": 1
          }],
          operations = serialiseOperations.fromJSON(operationsJSON),
          transformedContent = transformContent(content, operations),
          expectedContent = 'af';

    assert.equal(transformedContent, expectedContent);
  });

  it('results in a content with the given characters inserted if the sequence of operations is contains a single insert operation', function() {
    const content = 'asdf',
          operationsJSON = [{
	          "type": "insert",
            "string": "xyz",
            "position": 1
          }],
          operations = serialiseOperations.fromJSON(operationsJSON),
          transformedContent = transformContent(content, operations),
          expectedContent = 'axyzsdf';

    assert.equal(transformedContent, expectedContent);
  });

  it('results in a second content being returned if the operations generated from the first and second contents are applied to the first content', function() {
    const contentA = 'asdf',
          contentB = 'xyccde',
          generatedOperations = generateOperations(contentA, contentB),
          transformedContent = transformContent(contentA, generatedOperations),
          expectedContent = contentB;

    assert.equal(transformedContent, expectedContent);
  });
});
