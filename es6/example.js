"use strict";

import "juxtapose";

import withStyle from "easy-with-style";  ///

import { Body } from "easy";

import Agent from "./agent";
import Document from "./example/document";
import EditableContentTextarea from "./example/editableContentTextarea";

const { renderStyles } = withStyle;

const agent = Agent.fromNothing();

agent.initialise((content) => {
  const body = new Body(),
        editableContent = content,  ///
        editableContentTextarea =

          <EditableContentTextarea onKeyUp={(event, element) => {

                                     agent.update();

                                   }}
          >
            {editableContent}
          </EditableContentTextarea>

        ,
        document = Document.fromEditableContentTextarea(editableContentTextarea);

  agent.setDocument(document);

  renderStyles();

  body.append(

    <section>
      <h1>
        Concur Example
      </h1>
      {editableContentTextarea}
    </section>

  );
});
