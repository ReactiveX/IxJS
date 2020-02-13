import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { from as fromStatic } from '../../asynciterable/from';

/** @nocollapse */
AsyncIterableX.from = fromStatic;

export declare namespace asynciterable {
  let from: typeof fromStatic;
}

declare module '../../asynciterable/asynciterablex' {
  /* eslint no-shadow: "off" */
  namespace AsyncIterableX {
    export { fromStatic as from };
  }
}
