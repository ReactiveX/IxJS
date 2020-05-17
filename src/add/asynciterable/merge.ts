import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { merge as mergeStatic } from '../../asynciterable/merge';

/** @nocollapse */
AsyncIterableX.merge = mergeStatic;

declare module '../../asynciterable/asynciterablex' {
  // eslint-disable-next-line no-shadow
  namespace AsyncIterableX {
    export let merge: typeof mergeStatic;
  }
}
