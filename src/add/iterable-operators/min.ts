import { IterableX } from '../../iterable/iterablex';
import { min } from '../../iterable/min';
import { ExtremaOptions } from '../../iterable/extremaoptions';

/**
 * @ignore
 */
export function minProto<TSource, TResult = TSource>(
  this: IterableX<TSource>,
  options?: ExtremaOptions<TSource, TResult>
): TResult {
  return min(this, options);
}

IterableX.prototype.min = minProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    min: typeof minProto;
  }
}
