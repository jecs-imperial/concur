"use strict";

const express = require("express"),
      bodyParser = require("body-parser");

const { paths, handlers } = require("../lib/main"), ///
      { configurationUtilities } = require("necessary"),
      { createLiveReloadHandler } = require("lively-cli");

const { LIVE_RELOAD_PATH } = require("./paths"),
      { WATCH_PATTERN, PUBLIC_DIRECTORY_PATH } = require("./constants");

const { rc } = configurationUtilities,
      { UPDATE_PATH, INITIALISE_PATH } = paths,
      { updateTransactionHandler, initialiseTransactionHandler } = handlers;

rc();

const { port } = rc,
      server = express(), ///
      jsonRouter = express.Router(),
      staticRouter = express.static(PUBLIC_DIRECTORY_PATH),
      jsonBodyParser = bodyParser.json(),
      liveReloadHandler = createLiveReloadHandler(WATCH_PATTERN);

jsonRouter.use(jsonBodyParser);

jsonRouter.post(UPDATE_PATH, updateTransactionHandler);

jsonRouter.post(INITIALISE_PATH, initialiseTransactionHandler);

server.use(staticRouter);

server.use(jsonRouter);

server.get(LIVE_RELOAD_PATH, liveReloadHandler);

server.listen(port);
