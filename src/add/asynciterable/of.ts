import { AsyncIterableX } from '../../asynciterable/asynciterablex.js';
import { of as ofStatic } from '../../asynciterable/of.js';

/** @nocollapse */
AsyncIterableX.of = ofStatic;

export declare namespace asynciterable {
  let of: typeof ofStatic;
}

declare module '../../asynciterable/asynciterablex' {
  // eslint-disable-next-line no-shadow
  namespace AsyncIterableX {
    export { ofStatic as of };
  }
}
