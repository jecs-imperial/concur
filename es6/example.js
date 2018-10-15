'use strict';

require('juxtapose');

const easy = require('easy');

const client = require('./client'),
      ContentTextarea = require('./example/textarea/content');

const { Body } = easy;

client.initialise(function() {
  const body = new Body();

  body.append(

    <section>
      <h1>Concur example</h1>
      <ContentTextarea onChange={function(content, previousContent) {

                         const success = client.update(content, previousContent, function(pendingOperations) {
                           ///
                         });

                         return success;

                       }}
      />
    </section>

  );
});
