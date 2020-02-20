import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { from as fromStatic } from '../../asynciterable/from';

/** @nocollapse */
AsyncIterableX.from = fromStatic;

export declare namespace asynciterable {
  let from: typeof fromStatic;
}

declare module '../../asynciterable/asynciterablex' {
  // eslint-disable-next-line no-shadow
  namespace AsyncIterableX {
    export { fromStatic as from };
  }
}
