'use strict';

class UpdateHandler {
  constructor() {

  }

  toJSON() {
    return {};  ///
  }

  static fromJSON(json) {
    const updateHandler = new UpdateHandler();

    return updateHandler;
  }
}

module.exports = UpdateHandler;
