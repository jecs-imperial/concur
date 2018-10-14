'use strict';

const http = require('http'),
      necessary = require('necessary');

const server = require('./server');

const { miscellaneousUtilities } = necessary,
      { rc, onETX } = miscellaneousUtilities,
      { handleRequest } = server,
      { exit } = process;

rc();

const { port } = rc;

onETX(exit);

http.createServer(handleRequest).listen(port);
