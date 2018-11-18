'use strict';

const sufficient = require('sufficient');

const UpdateTask = require('./task/update'),
      InitialiseTask = require('./task/initialise');

const { Scheduler } = sufficient;

class Client {
  constructor(scheduler) {
    this.scheduler = scheduler;
  }

  updateDocument(userIdentifier, sessionIdentifier, workingContent, editableContent, callback) {
    const updateTask = new UpdateTask(userIdentifier, sessionIdentifier, workingContent, editableContent, callback);

    const success = this.scheduler.executeTaskImmediately(updateTask);

    return success;
  }

  initialise(callback) {
    const initialiseTask = new InitialiseTask(callback);

    this.scheduler.addTaskToQueue(initialiseTask);
  }

  static fromNothing() {
    const scheduler = Scheduler.fromNothing(),
          client = new Client(scheduler);

    return client;
  }
}

module.exports = Client;
