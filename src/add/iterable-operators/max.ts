import { IterableX } from '../../iterable/iterablex';
import { max } from '../../iterable/max';
import { equalityComparer } from '../../util/comparer';

export function maxProto<TSource>(
  this: IterableX<TSource>,
  comparer: (left: TSource, right: TSource) => number = equalityComparer
): TSource {
  return max(this, comparer);
}

IterableX.prototype.max = maxProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    max: typeof maxProto;
  }
}
