'use strict';

const express = require('express'),
      bodyParser = require('body-parser');

const uris = require('./uris'),
      UpdateTransaction = require('./transaction/update'),
      InitialiseTransaction = require('./transaction/initialise');

const { UPDATE_URI, INITIALISE_URI } = uris;

const handler = Transaction => function(request, response, next) {
  const { body } = request;

  let json = body;  ///

  const transaction = Transaction.fromJSON(json);

  json = transaction.toJSON();

  const statusCode = 200,
        headers = { 'Content-Type': 'application/json; charset=utf-8' },
        content = JSON.stringify(json);

  response.writeHead(statusCode, headers);

  response.write(content);

  response.end();
};

const router = express.Router(),
      jsonBodyParser = bodyParser.json();

router.use(jsonBodyParser);

router.post(UPDATE_URI, handler(UpdateTransaction));

router.post(INITIALISE_URI, handler(InitialiseTransaction));

module.exports = router;
