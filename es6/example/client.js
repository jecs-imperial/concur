'use strict';

const sufficient = require('sufficient');

const UpdateAsynchronousTask = require('./task/asynchronous/update'),
      InitialiseAsynchronousTask = require('./task/asynchronous/initialise');

const { Scheduler } = sufficient;

class Client {
  constructor(scheduler, userIdentifier) {
    this.scheduler = scheduler;
    this.userIdentifier = userIdentifier;
  }

  update(content, previousContent, callback) {
    const updateAsynchronousTask = new UpdateAsynchronousTask(this.userIdentifier, content, previousContent, callback);

    const success = this.scheduler.executeTaskImmediately(updateAsynchronousTask);

    return success;
  }

  initialise(callback) {
    const initialiseAsynchronousTask = new InitialiseAsynchronousTask(function(content, userIdentifier) {
      this.userIdentifier = userIdentifier;

      callback(content);
    }.bind(this));

    this.scheduler.addTaskToQueue(initialiseAsynchronousTask);
  }

  static fromNothing() {
    const scheduler = Scheduler.fromNothing(),
          userIdentifier = null,  ///
          client = new Client(scheduler, userIdentifier);

    return client;
  }
}

const client = Client.fromNothing();

module.exports = client;
