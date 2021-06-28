"use strict";

import { transformContent, generateOperations, transformOperations } from "../browser"; ///

export default class Document {
  constructor(workingContent, richTextarea) {
    this.workingContent = workingContent;
    this.richTextarea = richTextarea;
  }

  getWorkingContent() {
    return this.workingContent;
  }

  getEditableContent() {
    const content = this.richTextarea.getContent(),
          editableContent = content;  ///

    return editableContent;
  }

  setEditableContent(editableContent) {
    const content = editableContent;  ///

    this.richTextarea.setContent(content);
  }

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

  static fromContentAndRichTextarea(content, richTextarea) {
    const workingContent = content, ///
          document = new Document(workingContent, richTextarea);

    return document;
  }
}
