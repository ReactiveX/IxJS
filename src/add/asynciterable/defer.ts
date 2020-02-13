import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { defer as deferStatic } from '../../asynciterable/defer';

/** @nocollapse */
AsyncIterableX.defer = deferStatic;

declare module '../../asynciterable/asynciterablex' {
  /* eslint no-shadow: "off" */
  namespace AsyncIterableX {
    export let defer: typeof deferStatic;
  }
}
