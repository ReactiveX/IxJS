import { AsyncIterableX } from '../../asynciterable';
import { concatStatic } from '../../asynciterable/concat';

export function _concat<T>(...args: AsyncIterable<T>[]): AsyncIterableX<T> {
  return new AsyncIterableX<T>(concatStatic<T>(...args));
}

AsyncIterableX.concat = _concat;

declare module '../../asynciterable' {
  namespace AsyncIterableX {
    export let concat: typeof _concat;
  }
}