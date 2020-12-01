"use strict";

const lively = require("lively-cli"), ///
      express = require("express"),
      necessary = require("necessary"),
      bodyParser = require("body-parser");

const uris = require("../lib/uris"),
      handlers = require("../lib/handlers"),
      constants = require("./constants");

const { miscellaneousUtilities } = necessary,
      { rc } = miscellaneousUtilities,
      { createReloadHandler } = lively,
      { UPDATE_URI, INITIALISE_URI } = uris,
      { RELOAD_PATH, WATCH_PATTERN, PUBLIC_DIRECTORY_PATH } = constants,
      { updateTransactionHandler, initialiseTransactionHandler } = handlers;

rc();

const { port } = rc,
      server = express(), ///
      jsonRouter = express.Router(),
      staticRouter = express.static(PUBLIC_DIRECTORY_PATH),
      jsonBodyParser = bodyParser.json(),
      reloadHandler = createReloadHandler(WATCH_PATTERN);

jsonRouter.use(jsonBodyParser);

jsonRouter.post(UPDATE_URI, updateTransactionHandler);

jsonRouter.post(INITIALISE_URI, initialiseTransactionHandler);

server.use(staticRouter);

server.use(jsonRouter);

server.get(RELOAD_PATH, reloadHandler);

server.listen(port);
