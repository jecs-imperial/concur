'use strict';

const chai = require('chai');

const helpers = require('../helpers'),
      transformContent = require('../../es6/content/transform'),
      transformOperations = require('../../es6/operations/transform'),
      serialiseOperations = require('../../es6/operations/serialise');

const { assert } = chai;

describe('es6/operations/#transform', function() {
  describe('for two empty sequences of operations', function() {
    it('tau;rho/tau has the same effect as rho;tau/rho', function() {
      const tauJSON = [],
            rhoJSON = [],
            tau = serialiseOperations.fromJSON(tauJSON),
            rho = serialiseOperations.fromJSON(rhoJSON);

      assertOperationsHaveSameEffect(tau, rho);
    });
  });

  describe('for a sequence containing one operation and an empty sequence', function() {
    it('tau;rho/tau has the same effect as rho;tau/rho', function() {
      const tauJSON = [
            {
              "type": "insert",
              "string": "xyz",
              "position": 1
            }
          ],
          rhoJSON = [],
          tau = serialiseOperations.fromJSON(tauJSON),
          rho = serialiseOperations.fromJSON(rhoJSON);

      assertOperationsHaveSameEffect(tau, rho);
    });
  });

  describe('for two sequences each containing one operation', function() {
    it('tau;rho/tau has the same effect as rho;tau/rho', function() {
      const tauJSON = [
            {
              "type": "insert",
              "string": "xyz",
              "position": 1
            }
          ],
          rhoJSON = [
            {
              "type": "delete",
              "length": 2,
              "position": 1
            }
          ],
          tau = serialiseOperations.fromJSON(tauJSON),
          rho = serialiseOperations.fromJSON(rhoJSON);

      assertOperationsHaveSameEffect(tau, rho);
    });
  });

  describe('for a sequences containing one operation and a sequence containing two operations', function() {
    it('tau;rho/tau has the same effect as rho;tau/rho', function() {
      const tauJSON = [
            {
              "type": "insert",
              "string": "xyz",
              "position": 1,
            }
          ],
          rhoJSON = [
            {
              "type": "insert",
              "string": "abc",
              "position": 3
            },
            {
              "type": "delete",
              "length": 2,
              "position": 1,
            }
          ],
          tau = serialiseOperations.fromJSON(tauJSON),
          rho = serialiseOperations.fromJSON(rhoJSON);

      assertOperationsHaveSameEffect(tau, rho);
    });
  });

  describe('for two sequences each containing two operations', function() {
    it('tau;rho/tau has the same effect as rho;tau/rho', function() {
      const tauJSON = [
            {
              "type": "delete",
              "length": 6,
              "position": 0
            },
            {
              "type": "insert",
              "string": "JQ",
              "position": 0
            }
          ],
          rhoJSON = [
            {
              "type": "delete",
              "length": 4,
              "position": 0
            },
            {
              "type": "insert",
              "string": "bkW",
              "position": 0
            }
          ],
          tau = serialiseOperations.fromJSON(tauJSON),
          rho = serialiseOperations.fromJSON(rhoJSON);

      assertOperationsHaveSameEffect(tau, rho);
    });
  });

  describe('for a number of operations', function() {
    it('tau;rho/tau has the same effect as rho;tau/rho', function() {
      const numberOfOperations = 50,  ///
            content = helpers.content(),
            tau = helpers.operations(content, numberOfOperations),
            rho = helpers.operations(content, numberOfOperations),
            tauBackslashRho = transformOperations(tau, rho),
            rhoBackslashTau = transformOperations(rho, tau),
            firstOperations = tau.concat(rhoBackslashTau),
            secondOperations = rho.concat(tauBackslashRho),
            firstResultantContent = transformContent(content, firstOperations),
            secondResultantContent = transformContent(content, secondOperations);

      assert.equal(firstResultantContent, secondResultantContent);
    });
  });
});

function assertOperationsHaveSameEffect(tau, rho) {
  const transformedTau = transformOperations(tau, rho),
        transformedRho = transformOperations(rho, tau),
        firstOperations = tau.concat(transformedRho),
        secondOperations = rho.concat(transformedTau),
        content = 'zxcvyoiuq4658aadsf7809hj312wre', ///
        firstResultantContent = transformContent(content, firstOperations),
        secondResultantContent = transformContent(content, secondOperations);

  assert.equal(firstResultantContent, secondResultantContent);
}
