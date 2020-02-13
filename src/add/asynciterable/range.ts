import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { range as rangeStatic } from '../../asynciterable/range';

/** @nocollapse */
AsyncIterableX.range = rangeStatic;

declare module '../../asynciterable/asynciterablex' {
  /* eslint no-shadow: "off" */
  namespace AsyncIterableX {
    export let range: typeof rangeStatic;
  }
}
