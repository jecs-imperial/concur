"use strict";

import "juxtapose";

import withStyle from "easy-with-style";  ///

import { Body } from "easy";

import Agent from "./agent";
import Document from "./example/document";
import RichTextarea from "./example/richTextarea";

const { renderStyles } = withStyle;

const body = new Body(),
      richTextarea =

        <RichTextarea onKeyUp={(event, element) => {

                                agent.update();

                              }}
        />

      ;

renderStyles();

body.append(

  <section>
    <h1>
      Concur example
    </h1>
    {richTextarea}
  </section>

);

const agent = Agent.fromNothing();

agent.initialise((content) => {
  const document = Document.fromRichTextarea(richTextarea);

  agent.setDocument(document);

  richTextarea.setContent(content);

  richTextarea.activate();
});
