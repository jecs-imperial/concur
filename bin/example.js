'use strict';

const concur = require('../index'), ///
      express = require('express'),
      necessary = require('necessary'),
      bodyParser = require('body-parser');

const { miscellaneousUtilities } = necessary,
      { exit } = process,
      { uris, handlers } = concur,
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
