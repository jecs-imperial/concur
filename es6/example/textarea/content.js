'use strict';

const easy = require('easy');

const transformContent = require('../../content/transform'),
      generateOperations = require('../../operations/generate'),
      transformOperations = require('../../operations/transform');

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
    const value = content;  ///

    this.setValue(value);
  }

  getOperations() {
    const content = this.getContent(),
          previousContent = this.getPreviousContent(),
          operations = generateOperations(previousContent, content);

    return operations;
  }

  update(pendingOperations) {
    this.updateContent(pendingOperations);

    this.updatePreviousContent(pendingOperations);
  }

  updateContent(pendingOperations) {
    let content = this.getContent();

    const operations = this.getOperations(),
          transformedPendingOperations = transformOperations(pendingOperations, operations),
          transformedContent = transformContent(content, transformedPendingOperations);

    content = transformedContent; ///

    this.setContent(content);
  }

  updatePreviousContent(pendingOperations) {
    let previousContent = this.getPreviousContent();

    const transformedPreviousContent = transformContent(previousContent, pendingOperations);

    previousContent = transformedPreviousContent; ///

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
