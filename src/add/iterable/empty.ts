import { IterableImpl } from '../../iterable';
import { empty as emptyStatic } from '../../iterable/empty';

IterableImpl.empty = emptyStatic;

declare module '../../Iterable' {
  namespace IterableImpl {
    export let empty: typeof emptyStatic;
  }
}