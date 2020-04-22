"use strict";

import { Scheduler } from "sufficient";

import UpdateTask from "./task/update";
import InitialiseTask from "./task/initialise";

export default class Client {
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
