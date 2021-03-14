"use strict";

import UpdateTransaction from "./transaction/update";
import InitialiseTransaction from "./transaction/initialise";

function createHandler(Transaction) {
  return function(request, response, next) {
    const { body } = request;

    let json = body;  ///

    const transaction = Transaction.fromJSON(json);

    json = transaction.toJSON();

    const statusCode = 200,
          headers = { "Content-Type": "application/json; charset=utf-8" },
          content = JSON.stringify(json);

    response.writeHead(statusCode, headers);

    response.write(content);

    response.end();
  };
}

export const updateTransactionHandler = createHandler(UpdateTransaction);
export const initialiseTransactionHandler = createHandler(InitialiseTransaction);
