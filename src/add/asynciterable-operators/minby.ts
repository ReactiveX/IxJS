import { AsyncIterableX } from '../../asynciterable';
import { minBy } from '../../asynciterable/minby';

export function minByProto<TSource, TKey>(
    this: AsyncIterableX<TSource>,
    keyFn: (x: TSource) => TKey,
    cmp?: (x: TKey, y: TKey) => number): AsyncIterableX<TSource> {
  return minBy(this, keyFn, cmp);
}

AsyncIterableX.prototype.minBy = minByProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    minBy: typeof minByProto;
  }
}