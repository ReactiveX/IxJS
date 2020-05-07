import { IterableX } from '../../iterable/iterablex';
import { maxBy } from '../../iterable/maxby';
import { ExtremaByOptions } from '../../iterable/_extremaby';

/**
 * @ignore
 */
export function maxByProto<TSource, TKey>(
  this: IterableX<TSource>,
  selector: (item: TSource) => TKey,
  options?: ExtremaByOptions<TKey>
): TSource[] {
  return maxBy(this, selector, options);
}

IterableX.prototype.maxBy = maxByProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    maxBy: typeof maxByProto;
  }
}
