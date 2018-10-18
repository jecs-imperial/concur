'use strict';

const necessary = require('necessary');

const uris = require('./uris');

const { miscellaneousUtilities } = necessary,
      { post: poster } = miscellaneousUtilities,
      { UPDATE_URI, INITIALISE_URI } = uris;

const host = '';  ///

function updatePost(json, callback) {
  const uri = UPDATE_URI;

  poster(host, uri, json, callback);
}

function initialisePost(json, callback) {
  const uri = INITIALISE_URI;

  poster(host, uri, json, callback);
}

module.exports = {
  updatePost,
  initialisePost
};
