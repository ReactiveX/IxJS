import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { fromNodeStream as fromNodeStreamStatic } from '../../asynciterable/fromnodestream';

/** @nocollapse */
AsyncIterableX.fromNodeStream = fromNodeStreamStatic;

declare module '../../asynciterable/asynciterablex' {
  // eslint-disable-next-line no-shadow
  namespace AsyncIterableX {
    export let fromNodeStream: typeof fromNodeStreamStatic;
  }
}
