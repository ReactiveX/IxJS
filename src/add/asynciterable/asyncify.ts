import { AsyncIterableX } from '../../asynciterable/asynciterablex.js';
import { asyncify as asyncifyStatic } from '../../asynciterable/asyncify.js';

/** @nocollapse */
AsyncIterableX.asyncify = asyncifyStatic;

declare module '../../asynciterable/asynciterablex' {
  // eslint-disable-next-line no-shadow
  namespace AsyncIterableX {
    export let asyncify: typeof asyncifyStatic;
  }
}
