'use strict';

const transformContent = require('../content/transform'),
      generateOperations = require('../operations/generate'),
      transformOperations = require('../operations/transform');

class Document {
  constructor(workingContent, editableContentTextarea) {
    this.workingContent = workingContent;
    this.editableContentTextarea = editableContentTextarea;
  }

  getWorkingContent() {
    return this.workingContent;
  }

  getEditableContent() { return this.editableContentTextarea.getEditableContent(); }

  setEditableContent(editableContent) { this.editableContentTextarea.setEditableContent(editableContent); }

  update(pendingOperations) {
    let editableContent = this.getEditableContent();

    const operations = this.generateOperations(),
          transformedPendingOperations = transformOperations(pendingOperations, operations),
          transformedEditableContent = transformContent(editableContent, transformedPendingOperations),
          transformedWorkingContent = transformContent(this.workingContent, pendingOperations);

    editableContent = transformedEditableContent; ///

    this.setEditableContent(editableContent);

    this.workingContent = transformedWorkingContent; ///
  }

  generateOperations() {
    const editableContent = this.getEditableContent(),
          operations = generateOperations(this.workingContent, editableContent);

    return operations;
  }

  synchroniseWorkingContent() {
    const editableContent = this.getEditableContent();

    this.workingContent = editableContent;  ///
  }

  static fromEditableContentTextarea(editableContentTextarea) {
    const editableContent =editableContentTextarea.getEditableContent(),
          workingContent = editableContent, ///
          document = new Document(workingContent, editableContentTextarea);

    return document;
  }
}

module.exports = Document;
