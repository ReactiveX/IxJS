import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { mergeStatic as mergeStatic_ } from '../../asynciterable/merge';

/** @nocollapse */
AsyncIterableX.merge = mergeStatic_;

export declare namespace asynciterable {
  let mergeStatic: typeof mergeStatic_;
}

declare module '../../asynciterable/asynciterablex' {
  namespace AsyncIterableX {
    export let merge: typeof mergeStatic_;
  }
}
