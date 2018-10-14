'use strict';

const EmptyOperation = require('../operation/empty'),
      DeleteOperation = require('../operation/delete'),
      InsertOperation = require('../operation/insert');

function toJSON(operations) {
  return operations.map(function(operation) {
    return operation.toJSON();
  });
}

function fromJSON(operationsJSON) {
  const operations = operationsJSON.map(function(operationJSON) {
          const type = operationJSON.type,
                json = operationJSON; ///

          switch (type) {
            case EmptyOperation.type:
              return EmptyOperation.fromJSON(json);
            case DeleteOperation.type:
              return DeleteOperation.fromJSON(json);
            case InsertOperation.type:
              return InsertOperation.fromJSON(json);
          }
        });

  return operations;
}

module.exports = {
  toJSON,
  fromJSON
};
