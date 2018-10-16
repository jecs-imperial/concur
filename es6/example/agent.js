'use strict';

const Client = require('./client');

class Agent {
  constructor(client, userIdentifier) {
    this.client = client;
    this.userIdentifier = userIdentifier;
  }

  update(workingContent, editableContent, callback) {
    const success = this.client.update(this.userIdentifier, workingContent, editableContent, callback);

    return success;
  }

  initialise(callback) {
    this.client.initialise(function(content, userIdentifier) {
      this.userIdentifier = userIdentifier;

      callback(content);
    }.bind(this));
  }

  static fromNothing() {
    const client = Client.fromNothing(),
          userIdentifier = null,  ///
          agent = new Agent(client, userIdentifier);

    return agent;
  }
}

module.exports = Agent;
