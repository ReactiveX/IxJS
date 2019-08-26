import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { fromNodeStream as fromNodeStreamStatic } from '../../asynciterable/fromnodestream';

/** @nocollapse */
AsyncIterableX.fromNodeStream = fromNodeStreamStatic;

declare module '../../asynciterable/asynciterablex' {
  namespace AsyncIterableX {
    export let fromNodeStream: typeof fromNodeStreamStatic;
  }
}
