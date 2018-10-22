'use strict';

const types = require('../types'),
      EmptyOperation = require('../operation/empty'),
      DeleteOperation = require('../operation/delete'),
      InsertOperation = require('../operation/insert');

const { emptyType, deleteType, insertType } = types;

function operationsFromJSON(operationsJSON) {
  const operations = operationsJSON.map(function(operationJSON) {
    let operation;

    const json = operationJSON, ///
          type = json["type"];

    switch (type) {
      case emptyType:
        operation = EmptyOperation.fromJSON(json);
        break;

      case deleteType:
        operation = DeleteOperation.fromJSON(json);
        break;

      case insertType:
        operation = InsertOperation.fromJSON(json);
        break;
    }

    return operation;
  });

  return operations;
}

module.exports = operationsFromJSON;
