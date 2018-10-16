'use strict';

const Client = require('./client'),
      constants = require('./constants');

const { UPDATE_DELAY } = constants;

class Agent {
  constructor(client, timeout, document, userIdentifier) {
    this.client = client;
    this.timeout = timeout;
    this.document = document;
    this.userIdentifier = userIdentifier;
  }

  initialise(callback) {
    this.client.initialise(function(content, userIdentifier) {
      this.userIdentifier = userIdentifier;

      callback(content);
    }.bind(this));
  }

  setDocument(document) {
    this.document = document;
  }

  startUpdates() {
    const immediately = false;

    this.scheduleUpdate(immediately);
  }

  scheduleUpdate(immediately) {
    const delay = immediately ?
                    0 : ///
                      UPDATE_DELAY;

    if (this.timeout !== null) {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(() => this.update(), delay);
  }

  updateDocument(pendingOperations) {
    const upToDate = this.document.update(pendingOperations),
          immediately = !upToDate;

    this.scheduleUpdate(immediately);
  }

  update() {
    const workingContent = this.document.getWorkingContent(),
          editableContent = this.document.getEditableContent();

    const success = this.client.update(this.userIdentifier, workingContent, editableContent, pendingOperations => this.updateDocument(pendingOperations));

    if (success) {
      this.document.synchroniseWorkingContent();
    }
  }

  static fromNothing() {
    const client = Client.fromNothing(),
          timeout = null, ///
          document = null,  ///
          userIdentifier = null,  ///
          agent = new Agent(client, timeout, document, userIdentifier);

    return agent;
  }
}

module.exports = Agent;