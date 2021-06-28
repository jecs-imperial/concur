"use strict";

import withStyle from "easy-with-style";  ///

import { RichTextarea } from "easy-richtextarea";

export default withStyle(class extends RichTextarea {
  getRichTextarea() {
    const richTextarea = this;  ///

    return richTextarea;
  }

  parentContext() {
    const getRichTextarea = this.getRichTextarea.bind(this),
          activateRichTextarea = this.activate.bind(this),  ///
          setRichTextareaContent = this.setContent.bind(this);  ///

    return ({
      getRichTextarea,
      activateRichTextarea,
      setRichTextareaContent
    });
  }
})`

  width: 40rem;
  height: 20rem;
  border: 1px solid black;
  
`;
