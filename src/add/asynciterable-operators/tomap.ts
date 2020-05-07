import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { toMap, ToMapOptions } from '../../asynciterable/tomap';

export async function toMapProto<TSource, TKey, TElement = TSource>(
  this: AsyncIterable<TSource>,
  keySelector: (item: TSource, signal?: AbortSignal) => TKey | Promise<TKey>,
  options?: ToMapOptions<TSource, TElement>
): Promise<Map<TKey, TElement | TSource>> {
  return toMap(this, keySelector, options);
}

AsyncIterableX.prototype.toMap = toMapProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    toMap: typeof toMapProto;
  }
}
