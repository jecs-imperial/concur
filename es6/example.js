'use strict';

require('juxtapose');

const easy = require('easy');

const model = require('./model'),
      ContentTextarea = require('./example/textarea/content');

const { Body } = easy,
      { initialise, update } = model;

initialise(function() {
  const body = new Body();

  body.append(

    <section>
      <h1>Concur example</h1>
      <ContentTextarea onKeyUp={function() {

                         const content = this.getContent();

                         update(content, content => this.setContent(content));

                       }}
      />
    </section>

  );
});
