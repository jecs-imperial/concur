'use strict';

const constants = require('../constants');

const { HTTP_OK_STATUS_CODE } = constants;

function jsonHttpResponse(response, json) {
  const headers = {
          'Content-Type': 'text/plain; charset=utf-8'
        },
        statusCode = HTTP_OK_STATUS_CODE,
        content = JSON.stringify(json);

  response.writeHead(statusCode, headers);

  response.end(content);
}

module.exports = jsonHttpResponse;
