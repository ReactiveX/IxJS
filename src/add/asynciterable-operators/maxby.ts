import { AsyncIterableX } from '../../asynciterable';
import { maxBy } from '../../asynciterable/maxby';

export function maxByProto<TSource, TKey>(
    this: AsyncIterableX<TSource>,
    keyFn: (x: TSource) => TKey,
    cmp?: (x: TKey, y: TKey) => number): AsyncIterableX<TSource> {
  return new AsyncIterableX(maxBy(this, keyFn, cmp));
}

AsyncIterableX.prototype.maxBy = maxByProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    maxBy: typeof maxByProto;
  }
}