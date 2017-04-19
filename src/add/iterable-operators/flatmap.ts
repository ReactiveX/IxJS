import { IterableX } from '../../iterable';
import { flatMap } from '../../iterable/flatmap';

export function flatMapProto<TSource, TCollection, TResult>(this: IterableX<TSource>,
                                                            fn: (value: TSource, index: number) => Iterable<TCollection>,
                                                            resFn?: (value: TSource, current: TCollection) => TResult) {
  return flatMap(this, fn, resFn);
};
IterableX.prototype.flatMap = flatMapProto;

declare module '../../Iterable' {
  interface IterableX<T> {
    flatMap: typeof flatMapProto;
  }
}