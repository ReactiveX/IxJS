import { AsyncIterableX } from '../../asynciterable/asynciterablex.js';
import { asyncifyErrback as asyncifyErrbackStatic } from '../../asynciterable/asyncifyerrback.js';

/** @nocollapse */
AsyncIterableX.asyncifyErrback = asyncifyErrbackStatic;

declare module '../../asynciterable/asynciterablex' {
  // eslint-disable-next-line no-shadow
  namespace AsyncIterableX {
    export let asyncifyErrback: typeof asyncifyErrbackStatic;
  }
}
