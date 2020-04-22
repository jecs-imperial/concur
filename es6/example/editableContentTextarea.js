"use strict";

const easy = require("easy");

const { InputElement } = easy;

class EditableContentTextarea extends InputElement {
  setEditableContent(editableContent) {
    const value = editableContent;  ///

    this.setValue(value);
  }

  getEditableContent() {
    const value = this.getValue(),
          editableContent = value; ///

    return editableContent;
  }

  static tagName = "textarea";

  static defaultProperties = {
    className: "editable content",
    spellCheck: false
  };

  static fromProperties(properties) { return InputElement.fromProperties(EditableContentTextarea, properties); }
}

module.exports = EditableContentTextarea;
