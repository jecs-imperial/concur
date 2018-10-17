'use strict';

const types = require('../types'),
      EmptyOperation = require('../operation/empty');

const { deleteType } = types;

class DeleteOperation {
  constructor(type, length, position) {
	  this.type = type;
    this.length = length;
    this.position = position;
  }

  clone() {
    return DeleteOperation.fromLengthAndPosition(this.length, this.position);
  }

  toJSON() {
    const json = {
	          "type": this.type,
            "length": this.length,
            "position": this.position,
          };
    
    return json;
  }

  transformOperation(operation) {
    switch (operation.type) {
      case 'insert':
        return (function(tau, rho) {

          if (tau.position <= rho.position) {
            return [tau.clone()];
          }

          if (tau.position > rho.position) {
            if (tau.position < rho.length + rho.position) {
              return [tau.left(rho).shift(tau)];
            }
            if (tau.position >= rho.length + rho.position) {
              return [rho.shift(tau)];
            }
          }

        })(operation, this);

      case 'delete':
        return (function(tau, rho) {

          if (tau.position < rho.position) {
            if (tau.length + tau.position <= rho.position) {
              return [tau.clone()];
            }
            if (tau.length + tau.position <= rho.length + rho.position) {
              return [rho.takenFrom(tau)];
            }
            if (tau.length + tau.position > rho.length + rho.position) {
              return [rho.split(tau)];
            }
          }

          if (tau.position === rho.position) {
            if (tau.length + tau.position <= rho.length + rho.position) {
              return [EmptyOperation.fromNothing()];
            }
            if (tau.length + tau.position > rho.length + rho.position) {
              return [rho.shift(rho.takenFrom(tau))];
            }
          }

          if (tau.position >= rho.length + rho.position) {
            return [rho.shift(tau)];
          }

          if (tau.position > rho.position) {
            if (tau.length + tau.position <= rho.length + rho.position) {
              return [EmptyOperation.fromNothing()];
            }
            if (tau.length + tau.position > rho.length + rho.position) {
              return [rho.shift(rho.takenFrom(tau))];
            }
          }

        })(operation, this);

      case 'empty':
        return (function(tau, rho) {

          return [tau.clone()];

        })(operation, this);
    }
  }

  transformContent(content) {
    return content.substring(0, this.position) + content.substring(this.length + this.position);
  }

  transformSelection(selection) {
    let transformedSelection;

    const length = this.length,  ///
          startPosition = this.position, ///
          endPosition = startPosition + length,
          selectionStartPosition = selection.getStartPosition(),
          selectionEndPosition = selection.getEndPosition();

    let offset,
        endOffset;

    if (false) {

    } else if (selectionStartPosition >= endPosition) {
      offset = -length;

      transformedSelection = selection.shifted(offset);
    } else if (selectionStartPosition >= startPosition) {
      if (selectionEndPosition > endPosition) {
        offset = startPosition - selectionStartPosition;
        endOffset = selectionStartPosition - endPosition;

        transformedSelection = selection.shifted(offset).endPositionShifted(endOffset);
      } else {
        const Selection = selection.constructor;  ///

        transformedSelection = new Selection(startPosition, startPosition);
      }
    } else if (selectionEndPosition > endPosition) {
      endOffset = -length;

      transformedSelection = selection.endPositionShifted(endOffset);
    } else if (selectionEndPosition > startPosition) {
      endOffset = startPosition - selectionEndPosition;

      transformedSelection = selection.endPositionShifted(endOffset);
    }

    return transformedSelection;
  }

  shifted(offset) {
    const length = this.length,
          position = this.position + offset,
          deleteOperation = DeleteOperation.fromLengthAndPosition(length, position);

    return deleteOperation;
  }

  shift(operation) {
    const offset = -this.length,
          shiftedOperation = operation.shifted(offset);

    return shiftedOperation
  }

  takenFrom(deleteOperation) {
    let length = deleteOperation.length,
        position = deleteOperation.position;

    if (this.position > position && this.length + this.position >= length + position) {
      length = this.position - position;

      deleteOperation = DeleteOperation.fromLengthAndPosition(length, position);
    }

    if (this.position <= position && this.length + this.position < length + position) {
      length = length + position - this.position - this.length;
      position = this.length + this.position;

      deleteOperation = DeleteOperation.fromLengthAndPosition(length, position);
    }

    return deleteOperation;
  }

  split(deleteOperation) {
    let length = deleteOperation.length,
        position = deleteOperation.position;

    length = length - this.length;

    deleteOperation = DeleteOperation.fromLengthAndPosition(length, position);

    return deleteOperation;
  }

  static fromLengthAndPosition(length, position) {
    const type = deleteType, ///
          deleteOperation = new DeleteOperation(type, length, position);

    return deleteOperation;
  }

  static fromJSON(json) {
    const type = json["type"],
          length = json["length"],
          position = json["position"],
          deleteOperation = new DeleteOperation(type, length, position);

    return deleteOperation;
  }
}

module.exports = DeleteOperation;
