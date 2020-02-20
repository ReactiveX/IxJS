import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { combineLatest as combineLatestStatic } from '../../asynciterable/combinelatest';

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
