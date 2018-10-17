'use strict';

const express = require('express'),
      bodyParser = require('body-parser');

const uris = require('../../../es6/example/uris'), ///
      UpdateTransaction = require('../transaction/update'),
      InitialiseTransaction = require('../transaction/initialise');

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

const restfulRouter = express.Router(),
      jsonBodyParser = bodyParser.json();

restfulRouter.use(jsonBodyParser);

restfulRouter.post(UPDATE_URI, handler(UpdateTransaction));

restfulRouter.post(INITIALISE_URI, handler(InitialiseTransaction));

module.exports = restfulRouter;
