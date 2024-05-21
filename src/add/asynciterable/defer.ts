import { AsyncIterableX } from '../../asynciterable/asynciterablex.js';
import { defer as deferStatic } from '../../asynciterable/defer.js';

/** @nocollapse */
AsyncIterableX.defer = deferStatic;

declare module '../../asynciterable/asynciterablex' {
  // eslint-disable-next-line no-shadow
  namespace AsyncIterableX {
    export let defer: typeof deferStatic;
  }
}
