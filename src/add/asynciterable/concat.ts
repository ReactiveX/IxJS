import { AsyncIterableX } from '../../asynciterable';
import { concatStatic as concatStatic_ } from '../../asynciterable/concat';

AsyncIterableX.concat = concatStatic_;

export declare namespace asynciterable {
  let concatStatic: typeof concatStatic_;
}

declare module '../../asynciterable' {
  namespace AsyncIterableX {
    export let concat: typeof concatStatic_;
  }
}