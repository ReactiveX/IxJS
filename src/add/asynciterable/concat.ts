import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { concatStatic as concatStatic_ } from '../../asynciterable/concat';

/** @nocollapse */
AsyncIterableX.concat = concatStatic_;

export declare namespace asynciterable {
  let concatStatic: typeof concatStatic_;
}

declare module '../../asynciterable/asynciterablex' {
  namespace AsyncIterableX { export let concat: typeof concatStatic_; }
}
