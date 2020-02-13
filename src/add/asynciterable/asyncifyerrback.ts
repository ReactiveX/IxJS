import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { asyncifyErrback as asyncifyErrbackStatic } from '../../asynciterable/asyncifyerrback';

/** @nocollapse */
AsyncIterableX.asyncifyErrback = asyncifyErrbackStatic;

declare module '../../asynciterable/asynciterablex' {
  /* eslint no-shadow: "off" */
  namespace AsyncIterableX {
    export let asyncifyErrback: typeof asyncifyErrbackStatic;
  }
}
