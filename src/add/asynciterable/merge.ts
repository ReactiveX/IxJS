import { AsyncIterableX } from '../../asynciterable';
import { mergeStatic as mergeStatic_ } from '../../asynciterable/merge';

AsyncIterableX.merge = mergeStatic_;

export declare namespace asynciterable {
  let mergeStatic: typeof mergeStatic_;
}

declare module '../../asynciterable' {
  namespace AsyncIterableX {
    export let merge: typeof mergeStatic_;
  }
}
