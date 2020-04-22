"use strict";

function stringCompare(stringA, stringB) {
  if ((stringA === "") && (stringB === "")) {
    return false;
  }

  if (stringA === "") {
    return true;
  }

  if (stringB === "") {
    return false;
  }

  const codePointA = stringA.codePointAt(0),
        codePointB = stringB.codePointAt(0);

  if (codePointA < codePointB) {
    return true;
  }

  if (codePointA > codePointB) {
    return false;
  }

  const subStringA = stringA.substring(1),
        subStringB = stringB.substring(1);

  return stringCompare(subStringA, subStringB);
}

module.exports = stringCompare;
