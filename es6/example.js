'use strict';

require('juxtapose');

const easy = require('easy');

const client = require('./example/client'),
      Document = require('./example/document'),
      EditableContentTextarea = require('./example/textarea/editableContent');

const { Body } = easy;

client.initialise(function(content) {
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

    const success = client.update(workingContent, editableContent, pendingOperations => document.update(pendingOperations));

    if (success) {
      document.synchroniseWorkingContent();
    }
  }
});
