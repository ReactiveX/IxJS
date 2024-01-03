import { AsyncIterableX } from '../../asynciterable/asynciterablex.js';
import { concat as concatStatic } from '../../asynciterable/concat.js';

/** @nocollapse */
AsyncIterableX.concat = concatStatic;

export declare namespace asynciterable {
  let concat: typeof concatStatic;
}

declare module '../../asynciterable/asynciterablex' {
  // eslint-disable-next-line no-shadow
  namespace AsyncIterableX {
    export let concat: typeof concatStatic;
  }
}
