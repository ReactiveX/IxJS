import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { asyncifyErrback as asyncifyErrbackStatic } from '../../asynciterable/asyncifyerrback';

/** @nocollapse */
AsyncIterableX.asyncifyErrback = asyncifyErrbackStatic;

declare module '../../asynciterable/asynciterablex' {
  namespace AsyncIterableX {
    export let asyncifyErrback: typeof asyncifyErrbackStatic;
  }
}
