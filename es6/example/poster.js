'use strict';

const necessary = require('necessary');

const uris = require('../uris');

const { miscellaneousUtilities } = necessary,
      { post } = miscellaneousUtilities,
      { UPDATE_URI, INITIALISE_URI } = uris;

const host = '';  ///

function updatePost(json, callback) { post(host, UPDATE_URI, json, callback); }

function initialisePost(json, callback) { post(host, INITIALISE_URI, json, callback); }

module.exports = {
  updatePost,
  initialisePost
};
