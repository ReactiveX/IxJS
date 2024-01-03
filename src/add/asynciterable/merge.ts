import { AsyncIterableX } from '../../asynciterable/asynciterablex.js';
import { merge as mergeStatic } from '../../asynciterable/merge.js';

/** @nocollapse */
AsyncIterableX.merge = mergeStatic;

declare module '../../asynciterable/asynciterablex' {
  // eslint-disable-next-line no-shadow
  namespace AsyncIterableX {
    export let merge: typeof mergeStatic;
  }
}
