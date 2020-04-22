"use strict";

import transformContent from "../content/transform";
import generateOperations from "../operations/generate";
import transformOperations from "../operations/transform";

export default class Document {
  constructor(workingContent, editableContentTextarea) {
    this.workingContent = workingContent;
    this.editableContentTextarea = editableContentTextarea;
  }

  getWorkingContent() {
    return this.workingContent;
  }

  getEditableContent() { return this.editableContentTextarea.getEditableContent(); }

  setEditableContent(editableContent) { this.editableContentTextarea.setEditableContent(editableContent); }

  synchroniseWorkingContent() {
    const editableContent = this.getEditableContent(),
          workingContent = editableContent; ///

    this.workingContent = workingContent;
  }

  update(pendingOperations) {
    let editableContent = this.getEditableContent();

    const operations = this.generateOperations(),
          transformedPendingOperations = transformOperations(pendingOperations, operations),
          transformedEditableContent = transformContent(editableContent, transformedPendingOperations),
          transformedWorkingContent = transformContent(this.workingContent, pendingOperations);

    editableContent = transformedEditableContent; ///

    this.setEditableContent(editableContent);

    this.workingContent = transformedWorkingContent; ///

    const upToDate = (editableContent === this.workingContent);

    return upToDate
  }

  generateOperations() {
    const editableContent = this.getEditableContent(),
          operations = generateOperations(this.workingContent, editableContent);

    return operations;
  }

  static fromEditableContentTextarea(editableContentTextarea) {
    const editableContent = editableContentTextarea.getEditableContent(),
          workingContent = editableContent, ///
          document = new Document(workingContent, editableContentTextarea);

    return document;
  }
}
