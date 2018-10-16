'use strict';

module.exports = {
  'EmptyOperation': require('./lib/operation/empty'),
  'InsertOperation': require('./lib/operation/insert'),
  'DeleteOperation': require('./lib/operation/delete'),
  'transformContent': require('./lib/content/transform'),
  'generateOperations': require('./lib/operations/generate'),
  'transformOperations': require('./lib/operations/transform'),
  'serialiseOperations': require('./lib/operations/serialise')
};
