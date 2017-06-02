import { AsyncIterableX } from '../../asynciterable';
import { _for as forStatic } from '../../asynciterable/for';

export function _for<TSource, TResult>(
  source: AsyncIterable<TSource>,
  fn: (value: TSource) => AsyncIterable<TResult>): AsyncIterableX<TResult> {
  return forStatic(source, fn);
}

AsyncIterableX.for = _for;

declare module '../../asynciterable' {
  namespace AsyncIterableX {
    function _if<T, R>(
      source: Iterable<T>,
      fn: (value: T) => Iterable<R>): AsyncIterableX<R>;
    export { _for as for }
  }
}