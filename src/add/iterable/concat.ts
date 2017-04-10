import { IterableImpl } from '../../iterable';
import { concatStatic } from '../../iterable/concat';

IterableImpl.concat = concatStatic;

declare module '../../Iterable' {
  namespace IterableImpl {
    export let concat: typeof concatStatic;
  }
}