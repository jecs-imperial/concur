'use strict';

require('juxtapose');

const easy = require('easy');

const ContentTextarea = require('./example/textarea/content'),
      client = require('./example/client');

const { Body } = easy;

client.initialise(function(content) {
  const body = new Body();

  body.append(

    <section>
      <h1>Concur example</h1>
      <ContentTextarea onChange={function(content, previousContent) {

                         const success = client.update(content, previousContent, pendingOperations => this.update(pendingOperations));

                         return success;

                       }}
      >
        {content}
      </ContentTextarea>
    </section>

  );
});
