import { IterableX } from '../../iterable';
import { concatStatic } from '../../iterable/concat';

IterableX.concat = concatStatic;

declare module '../../iterable' {
  namespace IterableX {
    export let concat: typeof concatStatic;
  }
}