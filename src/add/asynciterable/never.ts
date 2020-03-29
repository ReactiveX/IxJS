import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { never as neverStatic } from '../../asynciterable/never';

/** @nocollapse */
AsyncIterableX.never = neverStatic;

declare module '../../asynciterable/asynciterablex' {
  // eslint-disable-next-line no-shadow
  namespace AsyncIterableX {
    export let never: typeof neverStatic;
  }
}
