import { AsyncIterableX } from '../../asynciterable';
import { range as rangeStatic } from '../../asynciterable/range';

AsyncIterableX.range = rangeStatic;

declare module '../../asynciterable' {
  namespace AsyncIterableX {
    export let range: typeof rangeStatic;
  }
}