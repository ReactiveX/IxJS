import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { fromDOMStream as fromDOMStreamStatic } from '../../asynciterable/fromdomstream';

/** @nocollapse */
AsyncIterableX.fromDOMStream = fromDOMStreamStatic;

declare module '../../asynciterable/asynciterablex' {
  namespace AsyncIterableX {
    export let fromDOMStream: typeof fromDOMStreamStatic;
  }
}
