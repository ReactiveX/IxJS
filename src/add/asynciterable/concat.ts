import { AsyncIterableX } from '../../asynciterable';
import { concatStatic } from '../../asynciterable/concat';

AsyncIterableX.concat = concatStatic;

declare module '../../asynciterable' {
  namespace AsyncIterableX {
    export let concat: typeof concatStatic;
  }
}