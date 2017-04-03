import { Iterable } from '../../iterable';
import { flatMap } from '../../iterable/flatmap';

Iterable.prototype.flatMap = function<TSource, TCollection, TResult>(
    fn: (value: TSource, index: number) => Iterable<TCollection>, 
    resFn?: (value: TSource, current: TCollection) => TResult) {
  return flatMap(this, fn, resFn);
};

declare module '../../Iterable' {
  interface Iterable<T> {
    flatMap<TCollection, TResult>(
      fn: (value: T, index: number) => Iterable<TCollection>,
      resFn?: (value: T, current: TCollection) => TResult
    ): Iterable<TResult>
  }
}