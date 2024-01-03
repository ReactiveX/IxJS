import { IterableX } from '../../iterable/iterablex.js';
import { minBy } from '../../iterable/minby.js';
import { ExtremaOptions } from '../../iterable/extremaoptions.js';

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
