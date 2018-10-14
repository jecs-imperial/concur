'use strict';

const express = require('express'),
      bodyParser = require('body-parser');

const urls = require('../urls'),
      UpdateHandler = require('../handler/update'),
      InitialiseHandler = require('../handler/initialise');

const { UPDATE_URL, INITIALISE_URL } = urls;

const handle = Handler => function(request, response, next) {
  const { body } = request;

  let json = body;  ///

  const handler = Handler.fromJSON(json);

  json = handler.toJSON();

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

restfulRouter.post(UPDATE_URL, handle(UpdateHandler));

restfulRouter.post(INITIALISE_URL, handle(InitialiseHandler));

module.exports = restfulRouter;
