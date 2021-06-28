"use strict";

import withStyle from "easy-with-style";

import { Element } from "easy";

import RichTextarea from "./richTextarea";

class View extends Element {
  childElements() {
    const { agent } = this.properties;

    return (

      <RichTextarea onChange={(event, element) => {

                      agent.update();

                    }}
      />

    );
  }

  initialise() {
    this.assignContext();
  }

  static tagName = "div";

  static ignoredProperties = [
    "agent"
  ];

  static defaultProperties = {
    className: "view"
  };
}

export default withStyle(View)`

  padding: 1rem;
  
`;