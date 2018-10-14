'use strict';

const constants = require('./constants'),
      UpdateRequest = require('./request/update'),
      UpdateResponse = require('./response/update'),
      jsonHttpResponse = require('./httpResponse/json'),
      errorHttpResponse = require('./httpResponse/error'),
      InitialiseRequest = require('./request/initialise'),
      InitialiseResponse = require('./response/initialise');

const { UPDATE_URL, INITIALISE_URL } = constants;

function handleRequest(request, response) {
  const { url } = request;

  switch (url) {
    case UPDATE_URL:
      updateRequestHandler(request, response);
      break;

    case INITIALISE_URL:
      initialiseRequestHandler(request, response);
      break;

    default:
      defaultRequestHandler(request, response);
      break;
  }
}

module.exports = {
  handleRequest
};

function updateRequestHandler(request, response) {
  jsonRequestHandler(request, response, function(json) {
    const updateRequest = UpdateRequest.fromJSON(json),
          updateResponse = UpdateResponse.fromUpdateRequest(updateRequest);

    json = updateResponse.toJSON();

    return json;
  });
}

function initialiseRequestHandler(request, response) {
  jsonRequestHandler(request, response, function(json) {
    const initialiseRequest = InitialiseRequest.fromJSON(json),
          initialiseResponse = InitialiseResponse.fromInitialiseRequest(initialiseRequest);

    json = initialiseResponse.toJSON();

    return json;
  });
}

function defaultRequestHandler(request, response) {
  errorHttpResponse('The URL is not recognised!', response);
}

function jsonRequestHandler(request, response, handler) {
  let body = '';

  request.on('data', function(data) {
    body += data;
  });

  request.on('end', function() {
    const requestJSON = JSON.parse(body),
          responseJSON = handler(requestJSON);

    jsonHttpResponse(response, responseJSON);
  });
}
