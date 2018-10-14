'use strict';

class EmptyOperation {
  constructor() {
    this.type = EmptyOperation.type;
  }

  clone() {
    return new EmptyOperation();
  }

  getType() {
    return this.type;
  }

  toJSON() {
    const json = {
            "type": this.type
          };
    
    return json;
  }

  transformOperation(operation) {
    return (function(tau, rho) {
      return [tau.clone()];
    })(operation, this);
  }

  transformContent(content) {
    return content;
  }

  shift(operation) {
  	const offset = 0;

    return (operation.shifted(offset));
  }

  static fromJSON(json) {
    return new EmptyOperation();
  }
}

Object.assign(EmptyOperation, {
  type: 'empty'
});

module.exports = EmptyOperation;
