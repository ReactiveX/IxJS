import { AsyncIterableX } from '../../asynciterable/asynciterablex.js';
import { range as rangeStatic } from '../../asynciterable/range.js';

/** @nocollapse */
AsyncIterableX.range = rangeStatic;

declare module '../../asynciterable/asynciterablex' {
  // eslint-disable-next-line no-shadow
  namespace AsyncIterableX {
    export let range: typeof rangeStatic;
  }
}
