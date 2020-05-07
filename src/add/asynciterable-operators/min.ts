import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { min } from '../../asynciterable/min';
import { equalityComparerAsync } from '../../util/comparer';

export function minProto<TSource>(
  this: AsyncIterable<TSource>,
  comparer: (left: TSource, right: TSource) => Promise<number> = equalityComparerAsync,
  signal?: AbortSignal
): Promise<TSource> {
  return min(this, comparer, signal);
}

AsyncIterableX.prototype.min = minProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    min: typeof minProto;
  }
}
