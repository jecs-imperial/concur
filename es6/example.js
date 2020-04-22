"use strict";

import "juxtapose";

import { Body } from"easy";

import Agent from "./agent";
import Document from "./example/document";
import EditableContentTextarea from "./example/editableContentTextarea";

const agent = Agent.fromNothing();

agent.initialise((content) => {
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
      <h1>
        Concur Example
      </h1>
      {editableContentTextarea}
    </section>

  );
});
