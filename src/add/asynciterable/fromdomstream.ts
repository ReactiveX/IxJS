import { AsyncIterableX } from '../../asynciterable/asynciterablex.js';
import { fromDOMStream as fromDOMStreamStatic } from '../../asynciterable/fromdomstream.js';

/** @nocollapse */
AsyncIterableX.fromDOMStream = fromDOMStreamStatic;

declare module '../../asynciterable/asynciterablex' {
  // eslint-disable-next-line no-shadow
  namespace AsyncIterableX {
    export let fromDOMStream: typeof fromDOMStreamStatic;
  }
}
