import { IterableX } from '../../iterable/iterablex.js';
import { flatMap } from '../../iterable/operators/flatmap.js';

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
