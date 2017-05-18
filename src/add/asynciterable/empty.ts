import { AsyncIterableX } from '../../asynciterable';
import { empty as emptyStatic } from '../../asynciterable/empty';

export function _empty<T>(): AsyncIterableX<T> {
  return emptyStatic<T>();
}

AsyncIterableX.empty = _empty;

declare module '../../asynciterable' {
  namespace AsyncIterableX {
    export let empty: typeof _empty;
  }
}