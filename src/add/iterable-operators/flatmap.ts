import { IterableX } from '../../iterable/iterablex';
import { flatMap } from '../../iterable/operators/flatmap';

/**
 * @ignore
 */
export function flatMapProto<TSource, TResult>(
  this: IterableX<TSource>,
  fn: (value: TSource) => Iterable<TResult>,
  thisArg?: any
): IterableX<TResult> {
  return flatMap<TSource, TResult>(fn, thisArg)(this);
}

IterableX.prototype.flatMap = flatMapProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    flatMap: typeof flatMapProto;
  }
}
