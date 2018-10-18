'use strict';

const express = require('express'),
      necessary = require('necessary');

const exampleRouter = require('../es6/example/router');

const { miscellaneousUtilities } = necessary,
      { rc, onETX } = miscellaneousUtilities,
      { exit } = process;

rc();

const { publicDirectoryPath, port } = rc;

const server = express(); ///

const staticRouter = express.static(publicDirectoryPath);

server.use(exampleRouter);

server.use(staticRouter);

server.listen(port);

onETX(exit);
