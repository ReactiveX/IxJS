import { IterableImpl } from '../../iterable';
import { flatMap } from '../../iterable/flatmap';

function flatMapProto<TSource, TCollection, TResult>(this: IterableImpl<TSource>,
  fn: (value: TSource, index: number) => Iterable<TCollection>,
  resFn?: (value: TSource, current: TCollection) => TResult) {
  return flatMap(this, fn, resFn);
};
IterableImpl.prototype.flatMap = flatMapProto;

declare module '../../Iterable' {
  interface IterableImpl<T> {
    flatMap: typeof flatMapProto;
  }
}