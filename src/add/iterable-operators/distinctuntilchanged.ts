import { IterableX } from '../../iterable';
import { distinctUntilChanged } from '../../iterable/distinctuntilchanged';

/**
 * @ignore
 */
export function distinctUntilChangedProto<TSource, TKey>(
    this: IterableX<TSource>,
    keySelector?: (value: TSource) => TKey,
    cmp?: (x: TKey, y: TKey) => boolean): IterableX<TSource> {
  return distinctUntilChanged(this, keySelector, cmp);
}

IterableX.prototype.distinctUntilChanged = distinctUntilChangedProto;

declare module '../../iterable' {
  interface IterableX<T> {
    distinctUntilChanged: typeof distinctUntilChangedProto;
  }
}