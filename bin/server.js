'use strict';

const necessary = require('necessary');

const User = require('./user'),
      transformContent = require('../es6/content/transform')

const { arrayUtilities } = necessary,
      { filter } = arrayUtilities;

let content = '';

const map = {};

function getContent() {
  return content;
}

function createUser() {
  const user = User.fromNothing(),
        userIdentifier = user.getIdentifier();

  map[userIdentifier] = user;

  return userIdentifier;
}

function update(operations, userIdentifier) {
  const user = getUser(userIdentifier),
        otherUsers = getOtherUsers(userIdentifier),
        transformedOperations = user.transformOperations(operations),
        transformedPendingOperations = user.transformedPendingOperations(operations);

  otherUsers.forEach(function(otherUser) {
    otherUser.update(transformedOperations);
  });

  content = transformContent(content, transformedOperations);

  user.reset();

  const pendingOperations = transformedPendingOperations; ///

  return pendingOperations;
}

module.exports = {
  getContent,
  createUser,
  update
};

function getUser(userIdentifier) {
  const user = map[userIdentifier];

  return user;
}

function getOtherUsers(userIdentifier) {
  const otherUsers = Object.values(map);

  filter(otherUsers, function(otherUser) {
    const otherUserIdentifier = otherUser.getIdentifier();

    if (otherUserIdentifier !== userIdentifier) {
      return true;
    }
  });

  return otherUsers;
}
