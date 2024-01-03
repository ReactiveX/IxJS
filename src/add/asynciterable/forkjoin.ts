import { AsyncIterableX } from '../../asynciterable/asynciterablex.js';
import { forkJoin as forkJoinStatic } from '../../asynciterable/forkjoin.js';

/** @nocollapse */
AsyncIterableX.forkJoin = forkJoinStatic;

export declare namespace asynciterable {
  let forkJoin: typeof forkJoinStatic;
}

declare module '../../asynciterable/asynciterablex' {
  // eslint-disable-next-line no-shadow
  namespace AsyncIterableX {
    export let forkJoin: typeof forkJoinStatic;
  }
}
