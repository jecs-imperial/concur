"use strict";

import { Task } from "sufficient";

import UpdateRequest from "../request/update";
import UpdateResponse from "../response/update";
import generateOperations from "../operations/generate";

import { updatePost } from "../poster";

export default class UpdateTask extends Task {
  constructor(userIdentifier, sessionIdentifier, workingContent, editableContent, callback) {
    super(asynchronousMethod, userIdentifier, sessionIdentifier, workingContent, editableContent, callback)
  }
}

function asynchronousMethod(userIdentifier, sessionIdentifier, workingContent, editableContent, callback) {
  const operations = generateOperations(workingContent, editableContent),
        updateRequest = UpdateRequest.fromOperationsUserIdentifierAndSessionIdentifier(operations, userIdentifier, sessionIdentifier),
        json = updateRequest.toJSON();

  updatePost(json, (json) => {
    const updateResponse = UpdateResponse.fromJSON(json),
					sessionExpired = updateResponse.getSessionExpired(),
          pendingOperations = updateResponse.getPendingOperations();

    callback(sessionExpired, pendingOperations);
  });
}
