'use strict';

const constants = require('../constants');

const { HTTP_INTERNAL_SERVER_ERROR_STATUS_CODE } = constants;

function errorHttpResponse(message, response) {
  const headers = {
          'Content-Type': 'text/plain'
        },
        statusCode = HTTP_INTERNAL_SERVER_ERROR_STATUS_CODE,
        content = message;  ///

  response.writeHead(statusCode, headers);

  response.end(content);
}

module.exports = errorHttpResponse;
