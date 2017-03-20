import { Iterable } from '../../iterable';
import { concatStatic } from '../../iterable/concat';

Iterable.concat = concatStatic;

declare module '../../Iterable' {
  namespace Iterable {
    export let concat: typeof concatStatic;
  }
}