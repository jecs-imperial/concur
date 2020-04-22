"use strict";

import stringCompare from "../stringCompare";
import DeleteOperation from "../operation/delete";

import { insertType } from "../types";

class InsertOperation {
  constructor(type, string, position) {
	  this.type = type;
    this.string = string;
    this.position = position;
  }

  clone() {
    return InsertOperation.fromStringAndPosition(this.string, this.position);
  }

  toJSON() {
    const json = {
	          "type": this.type,
            "string": this.string,
            "position": this.position
          };
    
    return json;
  }

  transformOperation(operation) {
    switch (operation.type) {
      case "insert":
        return ((tau, rho) => {

          if (tau.position < rho.position) {
            return [tau.clone()];
          }

          if (tau.position === rho.position) {
            if (tau.string === rho.string) {
              return [tau.clone()];
            }
            if (tau.string !== rho.string) {
              if (stringCompare(rho.string, tau.string)) {
                return [rho.shift(tau)];
              } else {
                return [tau.clone()];
              }
            }
          }

          if (tau.position > rho.position) {
            return [rho.shift(tau)];
          }

        })(operation, this);

      case "delete":
        return ((tau, rho) => {

          if (tau.position + tau.length <= rho.position) {
            return [tau.clone()];
          }

          if (tau.position < rho.position) {
            return [rho.left(tau), rho.left(tau).shift(rho.shift(rho.right(tau)))];
          }

          if (tau.position >= rho.position) {
            return [rho.shift(tau)];
          }

        })(operation, this);

      case "empty":
        return ((tau, rho) => {

          return [tau.clone()];

        })(operation, this);
    }
  }

  transformContent(content) {
    return content.substring(0, this.position) + this.string + content.substring(this.position);
  }

  transformSelection(selection) {
    let transformedSelection;

    const startPosition = this.position, ///
          length = this.string.length,
          selectionStartPosition = selection.getStartPosition(),
          selectionEndPosition = selection.getEndPosition(),
          offset = length,  ///
          endOffset = offset; ///

    if (false) {

    } else if (selectionStartPosition >= startPosition) {
      transformedSelection = selection.shifted(offset);
    } else if (selectionEndPosition > startPosition) {
      transformedSelection = selection.endPositionShifted(endOffset);
    } else {
      transformedSelection = selection.clone();
    }

    return transformedSelection;
  }

  shifted(offset) {
    const string = this.string,
          position = this.position + offset,
          insertOperation = InsertOperation.fromStringAndPosition(string, position);

    return insertOperation;
  }

  shift(operation) {
    const length = this.string.length,
				  offset = length,  ///
          shiftedOperation = operation.shifted(offset);

    return shiftedOperation;
  }

  left(deleteOperation) {
    const position = deleteOperation.position,
          length = this.position - position;

    deleteOperation = DeleteOperation.fromLengthAndPosition(length, position);

    return deleteOperation;
  }

  right(deleteOperation) {
    let length = deleteOperation.length,
        position = deleteOperation.position;

    length = length - this.position + position;
    position = this.position;

    deleteOperation = DeleteOperation.fromLengthAndPosition(length, position);

    return deleteOperation;
  }

  static fromStringAndPosition(string, position) {
    const type = insertType,  ///
          insertOperation = new InsertOperation(type, string, position);

    return insertOperation;
  }

  static fromJSON(json) {
    const type = json["type"],
          string = json["string"],
          position = json["position"],
          insertOperation = new InsertOperation(type, string, position);

    return insertOperation;
  }
}

module.exports = InsertOperation;
