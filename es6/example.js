'use strict';

require('juxtapose');

const easy = require('easy');

const Agent = require('./example/agent'),
      Document = require('./example/document'),
      EditableContentTextarea = require('./example/textarea/editableContent');

const { Body } = easy;

const agent = Agent.fromNothing();

agent.initialise(function(content) {
  const body = new Body(),
        editableContent = content,  ///
        editableContentTextarea =

          <EditableContentTextarea onKeyUp={keyUpHandler}>{editableContent}</EditableContentTextarea>

        ,
        document = Document.fromEditableContentTextarea(editableContentTextarea);

  body.append(

    <section>
      <h1>Concur example</h1>
      {editableContentTextarea}
    </section>

  );

  function keyUpHandler() {
    const workingContent = document.getWorkingContent(),
          editableContent = document.getEditableContent();

    const success = agent.update(workingContent, editableContent, pendingOperations => document.update(pendingOperations));

    if (success) {
      document.synchroniseWorkingContent();
    }
  }
});
