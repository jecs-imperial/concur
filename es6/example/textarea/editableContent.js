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

  parentContext() {
    const getEditableContent = this.getEditableContent.bind(this),
          setEditableContent = this.setEditableContent.bind(this);

    return ({
      getEditableContent,
      setEditableContent
    });
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
