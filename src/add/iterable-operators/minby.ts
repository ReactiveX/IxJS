import { IterableX } from '../../iterable/iterablex';
import { minBy } from '../../iterable/minby';
import { ExtremaByOptions } from '../../iterable/_extremaby';

/**
 * @ignore
 */
export function minByProto<TSource, TKey>(
  this: Iterable<TSource>,
  selector: (item: TSource) => TKey,
  options?: ExtremaByOptions<TKey>
): TSource[] {
  return minBy(this, selector, options);
}

IterableX.prototype.minBy = minByProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    minBy: typeof minByProto;
  }
}
