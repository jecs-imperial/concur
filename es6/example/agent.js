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
    this.client.initialise((content, userIdentifier, sessionIdentifier) => {
      this.userIdentifier = userIdentifier;
      this.sessionIdentifier = sessionIdentifier;

      this.startUpdates();

      callback(content);
    });
  }

  setDocument(document) {
    this.document = document;
  }

  update() {
    const immediately = true;

    this.deferUpdate(immediately);
  }

  startUpdates() {
    const immediately = false;

    this.deferUpdate(immediately);
  }

  deferUpdate(immediately) {
    const delay = immediately ?
                    0 : ///
                      UPDATE_DELAY;

    cancel(this.timeout);

    this.timeout = defer(() => this.deferredUpdate(), delay);
  }

  deferredUpdate() {
    const workingContent = this.document.getWorkingContent(),
          editableContent = this.document.getEditableContent();

    const success = this.client.updateDocument(this.userIdentifier, this.sessionIdentifier, workingContent, editableContent, (sessionExpired, pendingOperations) => {
    	if (sessionExpired) {
				alert('The session has expired. Please refresh!');

				return;
			}

      const upToDate = this.document.update(pendingOperations),
            immediately = !upToDate;

      this.deferUpdate(immediately);
		});

    if (success) {
      this.document.reset();
    } else {
      const immediately = false;

      this.deferUpdate(immediately);
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

function defer(method, delay) {
  const timeout = setTimeout(method, delay);

  return timeout;
}

function cancel(timeout) {
  if (timeout !== null) {
    clearTimeout(timeout);

    timeout = null;
  }

  return timeout;
}
