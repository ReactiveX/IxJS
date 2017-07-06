import { IterableX } from '../../iterable';
import { empty as emptyStatic } from '../../iterable/empty';

IterableX.empty = emptyStatic;

declare module '../../iterable' {
  namespace IterableX {
    export let empty: typeof emptyStatic;
  }
}