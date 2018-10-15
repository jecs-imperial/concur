'use strict';

const sufficient = require('sufficient');

const UpdateAsynchronousTask = require('./task/asynchronous/update'),
      InitialiseAsynchronousTask = require('./task/asynchronous/initialise');

const { Scheduler } = sufficient;

class Client {
  constructor(host, scheduler, userIdentifier) {
    this.host = host;
    this.scheduler = scheduler;
    this.userIdentifier = userIdentifier;
  }

  update(content, previousContent, callback) {
    const updateAsynchronousTask = new UpdateAsynchronousTask(this.host, this.userIdentifier, content, previousContent, function(pendingOperations) {
      callback(pendingOperations)
    }.bind(this));

    const success = this.scheduler.executeTaskImmediately(updateAsynchronousTask);

    return success;
  }

  initialise(done) {
    const initialiseAsynchronousTask = new InitialiseAsynchronousTask(this.host, function(userIdentifier) {
      this.userIdentifier = userIdentifier;

      done();
    }.bind(this));

    this.scheduler.addTaskToQueue(initialiseAsynchronousTask);
  }

  static fromNothing() {
    const host = '',  ///
          scheduler = Scheduler.fromNothing(),
          userIdentifier = null,  ///
          client = new Client(host, scheduler, userIdentifier);

    return client;
  }
}

const client = Client.fromNothing();

module.exports = client;
