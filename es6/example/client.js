'use strict';

const sufficient = require('sufficient');

const UpdateAsynchronousTask = require('./task/asynchronous/update'),
      InitialiseAsynchronousTask = require('./task/asynchronous/initialise');

const { Scheduler } = sufficient;

class Client {
  constructor(scheduler) {
    this.scheduler = scheduler;
  }

  update(userIdentifier, workingContent, editableContent, callback) {
    const updateAsynchronousTask = new UpdateAsynchronousTask(userIdentifier, workingContent, editableContent, callback);

    const success = this.scheduler.executeTaskImmediately(updateAsynchronousTask);

    return success;
  }

  initialise(callback) {
    const initialiseAsynchronousTask = new InitialiseAsynchronousTask(callback);

    this.scheduler.addTaskToQueue(initialiseAsynchronousTask);
  }

  static fromNothing() {
    const scheduler = Scheduler.fromNothing(),
          userIdentifier = null,  ///
          client = new Client(scheduler, userIdentifier);

    return client;
  }
}

module.exports = Client;
