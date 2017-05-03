import { IterableX } from '../../iterable';
import { distinct } from '../../iterable/distinct';

export function distinctProto<TSource, TKey>(
    this: IterableX<TSource>,
    keySelector?: (value: TSource) => TKey,
    cmp?: (x: TKey, y: TKey) => boolean): IterableX<TSource> {
  return new IterableX(distinct(this, keySelector, cmp));
}

IterableX.prototype.distinct = distinctProto;

declare module '../../iterable' {
  interface IterableX<T> {
    distinct: typeof distinctProto;
  }
}