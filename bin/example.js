'use strict';

const express = require('express'),
      necessary = require('necessary');

const restfulRouter = require('./example/router/restful');

const { miscellaneousUtilities } = necessary,
      { rc, onETX } = miscellaneousUtilities,
      { exit } = process;

rc();

const { publicDirectoryPath, port } = rc;

const server = express(); ///

const staticRouter = express.static(publicDirectoryPath);

server.use(restfulRouter);

server.use(staticRouter);

server.listen(port);

onETX(exit);
