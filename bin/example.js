'use strict';

const express = require('express'),
      necessary = require('necessary'),
      bodyParser = require('body-parser');

const uris = require('../es6/example/uris'),
      handlers = require('../es6/example/handlers');

const { miscellaneousUtilities } = necessary,
      { exit } = process,
      { rc, onETX } = miscellaneousUtilities,
      { UPDATE_URI, INITIALISE_URI } = uris,
      { updateTransactionHandler, initialiseTransactionHandler } = handlers;

rc();

const { publicDirectoryPath, port } = rc;

const server = express(), ///
      jsonRouter = express.Router(),
      staticRouter = express.static(publicDirectoryPath),
      jsonBodyParser = bodyParser.json();

jsonRouter.use(jsonBodyParser);

jsonRouter.post(UPDATE_URI, updateTransactionHandler);

jsonRouter.post(INITIALISE_URI, initialiseTransactionHandler);

server.use(staticRouter);

server.use(jsonRouter);

server.listen(port);

onETX(exit);
