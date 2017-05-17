import { IterableX } from '../../iterable';
import { empty as emptyStatic } from '../../iterable/empty';

export function _empty<T>(): IterableX<T> {
  return emptyStatic<T>();
}

IterableX.empty = _empty;

declare module '../../iterable' {
  namespace IterableX {
    export let empty: typeof _empty;
  }
}