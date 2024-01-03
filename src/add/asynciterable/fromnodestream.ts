import { AsyncIterableX } from '../../asynciterable/asynciterablex.js';
import { fromNodeStream as fromNodeStreamStatic } from '../../asynciterable/fromnodestream.js';

/** @nocollapse */
AsyncIterableX.fromNodeStream = fromNodeStreamStatic;

declare module '../../asynciterable/asynciterablex' {
  // eslint-disable-next-line no-shadow
  namespace AsyncIterableX {
    export let fromNodeStream: typeof fromNodeStreamStatic;
  }
}
