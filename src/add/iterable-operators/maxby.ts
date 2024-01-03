import { IterableX } from '../../iterable/iterablex.js';
import { maxBy } from '../../iterable/maxby.js';
import { ExtremaOptions } from '../../iterable/extremaoptions.js';

/**
 * @ignore
 */
export function maxByProto<TSource, TKey>(
  this: IterableX<TSource>,
  options?: ExtremaOptions<TSource, TKey>
): TSource[] {
  return maxBy(this, options);
}

IterableX.prototype.maxBy = maxByProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    maxBy: typeof maxByProto;
  }
}
