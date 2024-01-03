import { AsyncIterableX } from '../../asynciterable/asynciterablex.js';
import { never as neverStatic } from '../../asynciterable/never.js';

/** @nocollapse */
AsyncIterableX.never = neverStatic;

declare module '../../asynciterable/asynciterablex' {
  // eslint-disable-next-line no-shadow
  namespace AsyncIterableX {
    export let never: typeof neverStatic;
  }
}
