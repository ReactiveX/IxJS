import { AsyncIterableX } from '../../asynciterable/asynciterablex.js';
import { combineLatest as combineLatestStatic } from '../../asynciterable/combinelatest.js';

/** @nocollapse */
AsyncIterableX.combineLatest = combineLatestStatic;

export declare namespace asynciterable {
  let combineLatest: typeof combineLatestStatic;
}

declare module '../../asynciterable/asynciterablex' {
  // eslint-disable-next-line no-shadow
  namespace AsyncIterableX {
    export let combineLatest: typeof combineLatestStatic;
  }
}
