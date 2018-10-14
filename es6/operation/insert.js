'use strict';

const DeleteOperation = require('./delete');

class InsertOperation {
  constructor(string, position) {
	  this.type = InsertOperation.type;
    this.string = string;
    this.position = position;
  }

  clone() {
    return new InsertOperation(this.string, this.position);
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

  shifted(offset) {
    const string = this.string,
          position = this.position + offset;

    return new InsertOperation(string, position);
  }

  shift(operation) {
    const length = this.string.length,
				  offset = length;  ///

    return operation.shifted(offset);
  }

  left(deleteOperation) {
    const position = deleteOperation.position,
          length = this.position - position;

    return new DeleteOperation(length, position);
  }

  right(deleteOperation) {
    let length = deleteOperation.length,
        position = deleteOperation.position;

    length = length - this.position + position;
    position = this.position;

    return new DeleteOperation(length, position);
  }

  static fromJSON(json) {
    const string = json["string"],
          position = json["position"];

    return new InsertOperation(string, position);
  }
}

Object.assign(InsertOperation, {
  type: 'insert'
});

module.exports = InsertOperation;
