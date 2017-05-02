import { IterableX } from '../../iterable';
import { distinctUntilChanged } from '../../iterable/distinctuntilchanged';

function distinctUntilChangedProto<TSource, TKey>(
    this: IterableX<TSource>,
    keySelector?: (value: TSource) => TKey,
    cmp?: (x: TKey | TSource, y: TKey | TSource) => boolean): IterableX<TSource> {
  return new IterableX(distinctUntilChanged(this, keySelector, cmp));
}

IterableX.prototype.distinctUntilChanged = distinctUntilChangedProto;

declare module '../../iterable' {
  interface IterableX<T> {
    distinctUntilChanged: typeof distinctUntilChangedProto;
  }
}