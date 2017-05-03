import { IterableX } from '../../iterable';
import { _for as forStatic } from '../../iterable/for';

export function _for<TSource, TResult>(
    source: Iterable<TSource>,
    fn: (value: TSource) => Iterable<TResult>): IterableX<TResult> {
  return new IterableX(forStatic(source, fn));
}

IterableX.for = _for;

declare module '../../iterable' {
  namespace IterableX {
    function _if<T, R>(
      source: Iterable<T>,
      fn: (value: T) => Iterable<R>): IterableX<R>;
    export { _for as for }
  }
}