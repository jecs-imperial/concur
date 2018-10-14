'use strict';

const express = require('express'),
      necessary = require('necessary'),
      bodyParser = require('body-parser');

const restfulRouter = require('./router/restful');

const { miscellaneousUtilities } = necessary,
      { rc, onETX } = miscellaneousUtilities,
      { exit } = process;

rc();

onETX(exit);

const { publicDirectoryPath, port } = rc,
      server = express(), ///
      extended = true,
      options = {
        extended
      },
      staticRouter = express.static(publicDirectoryPath),
      bodyParserMiddleware = bodyParser.urlencoded(options); ///

server.use(bodyParserMiddleware);

server.use(restfulRouter);

server.use(staticRouter);

server.listen(port);
