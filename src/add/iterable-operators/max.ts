import { IterableX } from '../../iterable/iterablex';
import { max } from '../../iterable/max';
import { ExtremaOptions } from '../../iterable/extremaoptions';

export function maxProto<TSource, TResult = TSource>(
  this: IterableX<TSource>,
  options?: ExtremaOptions<TSource, TResult>
): TResult {
  return max(this, options);
}

IterableX.prototype.max = maxProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    max: typeof maxProto;
  }
}
