'use strict';

require('juxtapose');

const easy = require('easy');

const Agent = require('./agent'),
      Document = require('./example/document'),
      EditableContentTextarea = require('./example/editableContentTextarea');

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
      <h1>Concur Example</h1>
      {editableContentTextarea}
    </section>

  );
});
