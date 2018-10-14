'use strict';

const necessary = require('necessary'),
      sufficient = require('sufficient');

const uris = require('../bin/uris');  ///

const { UPDATE_URI, INITIALISE_URI } = uris,
      { miscellaneousUtilities } = necessary,
      { Scheduler, AsynchronousTask } = sufficient,
      { post } = miscellaneousUtilities;

const host = '',  ///
      scheduler = Scheduler.fromNothing();

function update(content, callback) {
  const updateAsynchronousTask = new AsynchronousTask(function(callback) {
    const uri = UPDATE_URI,
          json = {};

    post(host, uri, json, function(json) {
      callback(content);
    });
  }, callback);

  scheduler.executeTaskImmediately(updateAsynchronousTask);
}


function initialise(done) {
  const initialiseAsynchronousTask = new AsynchronousTask(function(done) {
    const uri = INITIALISE_URI,
          json = {};

    post(host, uri, json, function(json) {
      done();
    });
  }, done);

  scheduler.addTaskToQueue(initialiseAsynchronousTask);
}

module.exports = {
  update,
  initialise
};
