"use strict";

import withStyle from "easy-with-style";  ///

import { Textarea } from "easy";

class EditableContentTextarea extends Textarea {
  setEditableContent(editableContent) {
    const value = editableContent;  ///

    this.setValue(value);
  }

  getEditableContent() {
    const value = this.getValue(),
          editableContent = value; ///

    return editableContent;
  }

  static defaultProperties = {
    className: "editable content",
    spellCheck: false
  };
}

export default withStyle(EditableContentTextarea)`

  border: 1px solid black;
  width: 40rem;
  height: 20rem;
  
`;
