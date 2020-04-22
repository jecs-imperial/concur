"use strict";

import EmptyOperation from "../operation/empty";
import DeleteOperation from "../operation/delete";
import InsertOperation from "../operation/insert";

import { emptyType, deleteType, insertType } from "../types";

function operationsFromJSON(operationsJSON) {
  const operations = operationsJSON.map((operationJSON) => {
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
