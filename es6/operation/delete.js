'use strict';

const EmptyOperation = require('./empty');

const type = 'delete';

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
            return ([tau.clone()]);
          }

          if (tau.position > rho.position) {
            if (tau.position < rho.length + rho.position) {
              return ([tau.left(rho).shift(tau)]);
            }
            if (tau.position >= rho.length + rho.position) {
              return ([rho.shift(tau)]);
            }
          }

        })(operation, this);

      case 'delete':
        return (function(tau, rho) {

          if (tau.position < rho.position) {
            if (tau.length + tau.position <= rho.position) {
              return ([tau.clone()]);
            }
            if (tau.length + tau.position <= rho.length + rho.position) {
              return ([rho.takenFrom(tau)]);
            }
            if (tau.length + tau.position > rho.length + rho.position) {
              return ([rho.split(tau)]);
            }
          }

          if (tau.position === rho.position) {
            if (tau.length + tau.position <= rho.length + rho.position) {
              return ([EmptyOperation.fromNothing()]);
            }
            if (tau.length + tau.position > rho.length + rho.position) {
              return ([rho.shift(rho.takenFrom(tau))]);
            }
          }

          if (tau.position >= rho.length + rho.position) {
            return ([rho.shift(tau)]);
          }

          if (tau.position > rho.position) {
            if (tau.length + tau.position <= rho.length + rho.position) {
              return ([EmptyOperation.fromNothing()]);
            }
            if (tau.length + tau.position > rho.length + rho.position) {
              return ([rho.shift(rho.takenFrom(tau))]);
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
    const length = this.length,  ///
          startPosition = this.position, ///
          endPosition = startPosition + length,
          selectionStartPosition = selection.getStartPosition(),
          selectionEndPosition = selection.getEndPosition();

    let offset,
        endOffset;

    if (selectionStartPosition >= endPosition) {
      offset = -length;

      return selection.shifted(offset);
    }

    if (selectionStartPosition >= startPosition) {
      if (selectionEndPosition > endPosition) {
        offset = startPosition - selectionStartPosition;
        endOffset = selectionStartPosition - endPosition;

        return selection.shifted(offset).endPositionShifted(endOffset);
      } else {
        const Selection = selection.constructor;  ///

        return new Selection(startPosition, startPosition);
      }
    }

    if (selectionEndPosition > endPosition) {
      endOffset = -length;

      return selection.endPositionShifted(endOffset);
    }

    if (selectionEndPosition > startPosition) {
      endOffset = startPosition - selectionEndPosition;

      return selection.endPositionShifted(endOffset);
    }

    return selection.clone();
  }

  shifted(offset) {
    const length = this.length,
          position = this.position + offset;

    return DeleteOperation.fromLengthAndPosition(length, position);
  }

  shift(operation) {
    const offset = -this.length;

    return (operation.shifted(offset));
  }

  takenFrom(deleteOperation) {
    let length = deleteOperation.length,
        position = deleteOperation.position;

    if (this.position > position && this.length + this.position >= length + position) {
      length = this.position - position;

      return DeleteOperation.fromLengthAndPosition(length, position);
    }

    if (this.position <= position && this.length + this.position < length + position) {
      length = length + position - this.position - this.length;
      position = this.length + this.position;

      return DeleteOperation.fromLengthAndPosition(length, position);
    }
  }

  split(deleteOperation) {
    let length = deleteOperation.length,
        position = deleteOperation.position;

    length = length - this.length;

    return DeleteOperation.fromLengthAndPosition(length, position);
  }

  static fromLengthAndPosition(length, position) {
    return new DeleteOperation(type, length, position);
  }

  static fromJSON(json) {
    const type = json["type"],
          length = json["length"],
          position = json["position"];

    return new DeleteOperation(type, length, position);
  }
}

Object.assign(DeleteOperation, {
  type
});

module.exports = DeleteOperation;
