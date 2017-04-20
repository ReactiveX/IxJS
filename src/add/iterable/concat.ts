import { IterableX } from '../../iterable';
import { concatStatic } from '../../iterable/concat';

IterableX.concat = concatStatic;

declare module '../../Iterable' {
  namespace IterableX {
    export let concat: typeof concatStatic;
  }
}