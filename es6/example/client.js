'use strict';

const sufficient = require('sufficient');

const UpdateAsynchronousTask = require('./task/asynchronous/update'),
      InitialiseAsynchronousTask = require('./task/asynchronous/initialise');

const { Scheduler } = sufficient;

class Client {
  constructor(scheduler) {
    this.scheduler = scheduler;
  }

  update(userIdentifier, sessionIdentifier, workingContent, editableContent, callback) {
    const updateAsynchronousTask = new UpdateAsynchronousTask(userIdentifier, sessionIdentifier, workingContent, editableContent, callback);

    const success = this.scheduler.executeTaskImmediately(updateAsynchronousTask);

    return success;
  }

  initialise(callback) {
    const initialiseAsynchronousTask = new InitialiseAsynchronousTask(callback);

    this.scheduler.addTaskToQueue(initialiseAsynchronousTask);
  }

  static fromNothing() {
    const scheduler = Scheduler.fromNothing(),
          client = new Client(scheduler);

    return client;
  }
}

module.exports = Client;
