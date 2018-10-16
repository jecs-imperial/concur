'use strict';

const Client = require('./client'),
      constants = require('./constants');

const { UPDATE_DELAY } = constants;

class Agent {
  constructor(client, timeout, document, userIdentifier, sessionIdentifier) {
    this.client = client;
    this.timeout = timeout;
    this.document = document;
    this.userIdentifier = userIdentifier;
    this.sessionIdentifier = sessionIdentifier;
  }

  initialise(callback) {
    this.client.initialise(function(content, userIdentifier, sessionIdentifier) {
      this.userIdentifier = userIdentifier;
      this.sessionIdentifier = sessionIdentifier;

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

    const success = this.client.update(this.userIdentifier, this.sessionIdentifier, workingContent, editableContent, (sessionExpired, pendingOperations) => {
    	sessionExpired ?
				alert('The session has expired. Please refresh!') :
					this.updateDocument(pendingOperations);
		});

    if (success) {
      this.document.synchroniseWorkingContent();
    }
  }

  static fromNothing() {
    const client = Client.fromNothing(),
          timeout = null, ///
          document = null,  ///
          userIdentifier = null,  ///
					sessionIdentifier = null,	///
          agent = new Agent(client, timeout, document, userIdentifier, sessionIdentifier);

    return agent;
  }
}

module.exports = Agent;
