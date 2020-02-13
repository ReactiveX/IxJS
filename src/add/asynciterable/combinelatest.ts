import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { combineLatest as combineLatestStatic } from '../../asynciterable/combinelatest';

/** @nocollapse */
AsyncIterableX.combineLatest = combineLatestStatic;

export declare namespace asynciterable {
  let combineLatest: typeof combineLatestStatic;
}

declare module '../../asynciterable/asynciterablex' {
  /* eslint no-shadow: "off" */
  namespace AsyncIterableX {
    export let combineLatest: typeof combineLatestStatic;
  }
}
