import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { toMap, ToMapOptions } from '../../asynciterable/tomap';

export async function toMapProto<TSource, TKey, TElement = TSource>(
  this: AsyncIterable<TSource>,
  options: ToMapOptions<TSource, TKey, TElement>
): Promise<Map<TKey, TElement | TSource>> {
  return toMap(this, options);
}

AsyncIterableX.prototype.toMap = toMapProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    toMap: typeof toMapProto;
  }
}
