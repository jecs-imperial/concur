'use strict';

const necessary = require('necessary');

const uris = require('./uris');

const { miscellaneousUtilities } = necessary,
      { post } = miscellaneousUtilities,
      { UPDATE_URI, INITIALISE_URI } = uris;

const host = '';  ///

function postUpdate(json, callback) {
  const uri = UPDATE_URI;

  post(host, uri, json, callback);
}

function postInitialise(json, callback) {
  const uri = INITIALISE_URI;

  post(host, uri, json, callback);
}

module.exports = {
  postUpdate,
  postInitialise
};
