"use strict";

const express = require("express"),
      necessary = require("necessary"),
      bodyParser = require("body-parser");

const uris = require("../lib/uris"),
      handlers = require("../lib/handlers"),
      constants = require("./constants");

const { miscellaneousUtilities } = necessary,
      { rc, onETX } = miscellaneousUtilities,
      { PUBLIC_DIRECTORY_PATH } = constants,
      { UPDATE_URI, INITIALISE_URI } = uris,
      { updateTransactionHandler, initialiseTransactionHandler } = handlers;

rc();

const { port } = rc,
      server = express(), ///
      jsonRouter = express.Router(),
      publicDirectoryPath = PUBLIC_DIRECTORY_PATH,
      staticRouter = express.static(publicDirectoryPath),
      jsonBodyParser = bodyParser.json();

jsonRouter.use(jsonBodyParser);

jsonRouter.post(UPDATE_URI, updateTransactionHandler);

jsonRouter.post(INITIALISE_URI, initialiseTransactionHandler);

server.use(staticRouter);

server.use(jsonRouter);

server.listen(port);

onETX(process.exit);
