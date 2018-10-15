'use strict';

const easy = require('easy');

const { InputElement } = easy;

class ContentTextarea extends InputElement {
  constructor(selector, changeHandler) {
    super(selector);

    this.changeHandler = changeHandler;

    this.setInitialState();
  }

  getContent() {
    const value = this.getValue(),
          content = value; ///

    return content;
  }

  setContent(content) {
    const value = content,  ///
          previousContent = content;  ///

    this.setValue(value);

    this.setPreviousContent(previousContent);
  }

  keyUpHandler() {
    let content = this.getContent(),
        previousContent = this.getPreviousContent();

    if (content !== previousContent) {
      const success = this.changeHandler(content, previousContent);

      if (success) {
        previousContent = content;  ///

        this.setPreviousContent(previousContent);
      }
    }
  }

  parentContext() {
    const getContent = this.getContent.bind(this),
          setContent = this.setContent.bind(this);

    return ({
      getContent,
      setContent
    });
  }

  getPreviousContent() {
    const state = this.getState(),
          { previousContent } = state;

    return previousContent;
  }

  setPreviousContent(previousContent) {
    this.updateState({
      previousContent
    });
  }

  setInitialState() {
    const previousContent = null;

    this.setState({
      previousContent
    });
  }

  initialise() {
    const content = this.getContent(),
          previousContent = content;  ///

    this.setPreviousContent(previousContent);

    this.on('keyup', this.keyUpHandler, this);
  }

  static fromProperties(properties) {
    const { onChange } = properties,
          changeHandler = onChange, ///
          contentTextarea = InputElement.fromProperties(ContentTextarea, properties, changeHandler);

    contentTextarea.initialise();

    return contentTextarea;
  }
}

Object.assign(ContentTextarea, {
  tagName: 'textarea',
  defaultProperties: {
    className: 'content',
    spellCheck: false
  },
  ignoredProperties: [
    'onChange'
  ]
});

module.exports = ContentTextarea;
