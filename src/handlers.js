"use strict";

import UpdateTransaction from "./transaction/update";
import InitialiseTransaction from "./transaction/initialise";

import { CONTENT_TYPE, APPLICATION_JSON_CHARSET_UTF_8 } from "./constants";

function createHandler(Transaction) {
  return function(request, response, next) {
    const { body } = request;

    let json = body;  ///

    const transaction = Transaction.fromJSON(json);

    json = transaction.toJSON();

    const statusCode = 200,
          headers = {},
          content = JSON.stringify(json);

    headers[CONTENT_TYPE] = APPLICATION_JSON_CHARSET_UTF_8;

    response.writeHead(statusCode, headers);

    response.write(content);

    response.end();
  };
}

const updateTransactionHandler = createHandler(UpdateTransaction);
const initialiseTransactionHandler = createHandler(InitialiseTransaction);

export default {
  updateTransactionHandler,
  initialiseTransactionHandler
};
