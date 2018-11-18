'use strict';

const easy = require('easy');

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

  static fromProperties(properties) { return InputElement.fromProperties(EditableContentTextarea, properties); }
}

Object.assign(EditableContentTextarea, {
  tagName: 'textarea',
  defaultProperties: {
    className: 'editable content',
    spellCheck: false
  }
});

module.exports = EditableContentTextarea;
