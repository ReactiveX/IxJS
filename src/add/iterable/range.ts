import { IterableX } from '../../iterable';
import { range as rangeStatic } from '../../iterable/range';

IterableX.range = rangeStatic;

declare module '../../iterable' {
  namespace IterableX {
    export let range: typeof rangeStatic;
  }
}