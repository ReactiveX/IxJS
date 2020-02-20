import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { defer as deferStatic } from '../../asynciterable/defer';

/** @nocollapse */
AsyncIterableX.defer = deferStatic;

declare module '../../asynciterable/asynciterablex' {
  // eslint-disable-next-line no-shadow
  namespace AsyncIterableX {
    export let defer: typeof deferStatic;
  }
}
