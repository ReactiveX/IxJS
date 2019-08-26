import { IterableX } from '../../iterable/iterablex';
import { distinctUntilChanged } from '../../iterable/operators/distinctuntilchanged';

/**
 * @ignore
 */
export function distinctUntilChangedProto<TSource, TKey>(
  this: IterableX<TSource>,
  keySelector?: (value: TSource) => TKey,
  cmp?: (x: TKey, y: TKey) => boolean
): IterableX<TSource> {
  return distinctUntilChanged(keySelector, cmp)(this);
}

IterableX.prototype.distinctUntilChanged = distinctUntilChangedProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    distinctUntilChanged: typeof distinctUntilChangedProto;
  }
}
