'use strict';

const DeleteOperation = require('./delete');

const type = 'insert';

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
      case 'insert':
        return (function(tau, rho) {

          if (tau.position < rho.position) {
            return ([tau.clone()]);
          }

          if (tau.position === rho.position) {
            if (tau.string === rho.string) {
              return ([tau.clone()]);
            }
            if (tau.string !== rho.string) {
              if (rho.string.localeCompare(tau.string) < 0) {
                return ([rho.shift(tau)]);
              }
              else {
                return ([tau.clone()]);
              }
            }
          }

          if (tau.position > rho.position) {
            return ([rho.shift(tau)]);
          }

        })(operation, this);

      case 'delete':
        return (function(tau, rho) {

          if (tau.position + tau.length <= rho.position) {
            return ([tau.clone()]);
          }

          if (tau.position < rho.position) {
            return ([rho.left(tau), rho.left(tau).shift(rho.shift(rho.right(tau)))]);
          }

          if (tau.position >= rho.position) {
            return ([rho.shift(tau)]);
          }

        })(operation, this);

      case 'empty':
        return (function(tau, rho) {

          return [tau.clone()];

        })(operation, this);
    }
  }

  transformContent(content) {
    return content.substring(0, this.position) + this.string + content.substring(this.position);
  }

  transformSelection(selection) {
    const startPosition = this.position, ///
          length = this.string.length,
          selectionStartPosition = selection.getStartPosition(),
          selectionEndPosition = selection.getEndPosition(),
          offset = length,
          endOffset = offset;

    if (selectionStartPosition >= startPosition) {
      return selection.shifted(offset);
    }

    if (selectionEndPosition > startPosition) {
      return selection.endPositionShifted(endOffset);
    }

    return selection.clone();
  }

  shifted(offset) {
    const string = this.string,
          position = this.position + offset;

    return InsertOperation.fromStringAndPosition(string, position);
  }

  shift(operation) {
    const length = this.string.length,
				  offset = length;  ///

    return operation.shifted(offset);
  }

  left(deleteOperation) {
    const position = deleteOperation.position,
          length = this.position - position;

    return DeleteOperation.fromLengthAndPosition(length, position);
  }

  right(deleteOperation) {
    let length = deleteOperation.length,
        position = deleteOperation.position;

    length = length - this.position + position;
    position = this.position;

    return DeleteOperation.fromLengthAndPosition(length, position);
  }

  static fromStringAndPosition(string, position) {
    return new InsertOperation(type, string, position);
  }

  static fromJSON(json) {
    const type = json["type"],
          string = json["string"],
          position = json["position"];

    return new InsertOperation(type, string, position);
  }
}

Object.assign(InsertOperation, {
  type
});

module.exports = InsertOperation;
