'use strict';

const EmptyOperation = require('./empty');

class DeleteOperation {
  constructor(length, position) {
	  this.type = DeleteOperation.type;
    this.length = length;
    this.position = position;
  }

  clone() {
    return new DeleteOperation(this.length, this.position);
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
              return ([new EmptyOperation()]);
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
              return ([new EmptyOperation()]);
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

  shifted(offset) {
    const length = this.length,
          position = this.position + offset;

    return new DeleteOperation(length, position);
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

      return new DeleteOperation(length, position);
    }

    if (this.position <= position && this.length + this.position < length + position) {
      length = length + position - this.position - this.length;
      position = this.length + this.position;

      return new DeleteOperation(length, position);
    }
  }

  split(deleteOperation) {
    let length = deleteOperation.length,
        position = deleteOperation.position;

    length = length - this.length;

    return new DeleteOperation(length, position);
  }

  static fromJSON(json) {
    const length = json["length"],
          position = json["position"];

    return new DeleteOperation(length, position);
  }
}

Object.assign(DeleteOperation, {
  type: 'delete'
});

module.exports = DeleteOperation;
