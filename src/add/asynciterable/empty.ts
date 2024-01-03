import { AsyncIterableX } from '../../asynciterable/asynciterablex.js';
import { empty as emptyStatic } from '../../asynciterable/empty.js';

/** @nocollapse */
AsyncIterableX.empty = emptyStatic;

declare module '../../asynciterable/asynciterablex' {
  // eslint-disable-next-line no-shadow
  namespace AsyncIterableX {
    export let empty: typeof emptyStatic;
  }
}
