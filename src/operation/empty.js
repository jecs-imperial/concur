"use strict";

import { emptyType } from "../types";

export default class EmptyOperation {
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
    return ((tau, rho) => {

      return [tau.clone()];

    })(operation, this);
  }

  transformContent(content) {
    return content;
  }

  transformSelection(selection) {
    const transformedSelection = selection.clone();

    return transformedSelection;
  }



  shift(operation) {
  	const offset = 0,
          shiftedOperation = operation.shifted(offset);

  	return shiftedOperation;
  }





  static fromNothing() {
    const type = emptyType, ///
          emptyOperation = new EmptyOperation(type);

    return emptyOperation;
  }

  static fromJSON(json) {
    const type = json["type"],
          emptyOperation = new EmptyOperation(type);

    return emptyOperation;
  }
}
