'use strict';

const UpdateTransaction = require('./transaction/update'),
      InitialiseTransaction = require('./transaction/initialise');

const updateTransactionHandler = createHandler(UpdateTransaction),
      initialiseTransactionHandler = createHandler(InitialiseTransaction);

module.exports = {
  updateTransactionHandler,
  initialiseTransactionHandler
};

function createHandler(Transaction) {
  return function(request, response, next) {
    const { body } = request;

    let json = body;  ///

    const transaction = Transaction.fromJSON(json);

    json = transaction.toJSON();

    const statusCode = 200,
          headers = { 'Content-Type': 'application/json; charset=utf-8' },
          content = JSON.stringify(json);

    response.writeHead(statusCode, headers);

    response.write(content);

    response.end();
  };
}
