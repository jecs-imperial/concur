'use strict';

function stringCompare(stringA, stringB) {
  return (stringA.localeCompare(stringB) < 0)
}

module.exports = stringCompare;
