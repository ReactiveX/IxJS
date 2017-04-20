import { IterableX } from '../../iterable';
import { empty as emptyStatic } from '../../iterable/empty';

IterableX.empty = emptyStatic;

declare module '../../Iterable' {
  namespace IterableX {
    export let empty: typeof emptyStatic;
  }
}