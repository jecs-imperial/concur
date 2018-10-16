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

          <EditableContentTextarea onKeyUp={() => {

                                     agent.update();

                                   }}
          >
            {editableContent}
          </EditableContentTextarea>

        ,
        document = Document.fromEditableContentTextarea(editableContentTextarea);

  agent.setDocument(document);

  body.append(

    <section>
      <h1>Concur example</h1>
      {editableContentTextarea}
    </section>

  );

  agent.startUpdates();
});
