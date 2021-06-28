"use strict";

import "juxtapose";

import withStyle from "easy-with-style";  ///

import { Body } from "easy";

import View from "./example/view";
import Agent from "./agent";
import Document from "./example/document";

const { renderStyles } = withStyle;

const body = new Body(),
      agent = Agent.fromNothing(),
      view =

        <View agent={agent} />

      ;

renderStyles();

body.mount(view);

agent.initialise((content) => {
  const richTextarea = view.getRichTextarea(),
        document = Document.fromContentAndRichTextarea(content, richTextarea);

  agent.setDocument(document);

  view.activateRichTextarea();

  view.setRichTextareaContent(content);
});
