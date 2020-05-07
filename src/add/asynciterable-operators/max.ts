import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { max } from '../../asynciterable/max';
import { equalityComparerAsync } from '../../util/comparer';

export async function maxProto<TSource>(
  this: AsyncIterable<TSource>,
  comparer: (left: TSource, right: TSource) => Promise<number> = equalityComparerAsync,
  signal?: AbortSignal
): Promise<TSource> {
  return max(this, comparer, signal);
}

AsyncIterableX.prototype.max = maxProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    max: typeof maxProto;
  }
}
