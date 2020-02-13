import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { of as ofStatic } from '../../asynciterable/of';

/** @nocollapse */
AsyncIterableX.of = ofStatic;

export declare namespace asynciterable {
  let of: typeof ofStatic;
}

declare module '../../asynciterable/asynciterablex' {
  /* eslint no-shadow: "off" */
  namespace AsyncIterableX {
    export { ofStatic as of };
  }
}
