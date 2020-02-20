import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { asyncifyErrback as asyncifyErrbackStatic } from '../../asynciterable/asyncifyerrback';

/** @nocollapse */
AsyncIterableX.asyncifyErrback = asyncifyErrbackStatic;

declare module '../../asynciterable/asynciterablex' {
  // eslint-disable-next-line no-shadow
  namespace AsyncIterableX {
    export let asyncifyErrback: typeof asyncifyErrbackStatic;
  }
}
