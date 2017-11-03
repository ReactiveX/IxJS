import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { combineLatest as combineLatestStatic } from '../../asynciterable/combinelatest';

AsyncIterableX.combineLatest = combineLatestStatic;

export declare namespace asynciterable {
  let combineLatest: typeof combineLatestStatic;
}

declare module '../../asynciterable/asynciterablex' {
  namespace AsyncIterableX { export let combineLatest: typeof combineLatestStatic; }
}
