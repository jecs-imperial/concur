"use strict";

import { arrayUtilities } from "necessary";

const { first, tail } = arrayUtilities;

export default function transformOperations(tau, rho) {
  if ((tau.length === 0) || (rho.length === 0)) {
    return tau;
  }

  const tau1 = [first(tau)],
        tau2 = tail(tau),
        rho1 = [first(rho)],
        rho2 = tail(rho);

  if (tau.length > 1 && rho.length > 1) {
    return (
      transformOperations(
        transformOperations(tau1, rho1),
        rho2
      ).concat(
        transformOperations(
          transformOperations(
            tau2,
            transformOperations(rho1, tau1)
          ),
          transformOperations(
            rho2,
            transformOperations(tau1, rho1)
          )
        )
      )
    );
  } else if ((tau.length > 1) && (rho.length === 1)) {
    return (
      transformOperations(tau1, rho).concat(
        transformOperations(
          tau2,
          transformOperations(rho, tau1)
        )
      )
    );
  } else if ((tau.length === 1) && (rho.length > 1)) {
    return (
      transformOperations(
        transformOperations(tau, rho1),
        rho2
      )
    );
  } else {
    tau = first(tau); ///
    rho = first(rho); ///

    return rho.transformOperation(tau);
  }
}
