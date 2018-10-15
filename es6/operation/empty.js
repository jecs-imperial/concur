'use strict';



const type = 'empty';

class EmptyOperation {
  constructor(type) {
    this.type = type;


  }

  clone() {
    return EmptyOperation.fromNothing();
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

  transformSelection(selection) {
    return selection.clone();
  }



  shift(operation) {
  	const offset = 0;

    return (operation.shifted(offset));
  }





  static fromNothing() {
    return new EmptyOperation(type);
  }

  static fromJSON(json) {
    const type = json["type"];

    return new EmptyOperation(type);
  }
}

Object.assign(EmptyOperation, {
  type
});

module.exports = EmptyOperation;

































































