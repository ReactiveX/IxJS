import { IterableX } from '../../iterable/iterablex';
import { minBy } from '../../iterable/minby';
import { ExtremaOptions } from '../../iterable/extremaoptions';

/**
 * @ignore
 */
export function minByProto<TSource, TKey>(
  this: Iterable<TSource>,
  options?: ExtremaOptions<TSource, TKey>
): TSource[] {
  return minBy(this, options);
}

IterableX.prototype.minBy = minByProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    minBy: typeof minByProto;
  }
}
