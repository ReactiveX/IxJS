import { AsyncIterableX } from '../../asynciterable';
import { distinctUntilChanged } from '../../asynciterable/distinctuntilchanged';

export function distinctUntilChangedProto<TSource, TKey>(
    this: AsyncIterableX<TSource>,
    keySelector?: (value: TSource) => TKey,
    cmp?: (x: TKey | TSource, y: TKey | TSource) => boolean): AsyncIterableX<TSource> {
  return new AsyncIterableX(distinctUntilChanged(this, keySelector, cmp));
}

AsyncIterableX.prototype.distinctUntilChanged = distinctUntilChangedProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    distinctUntilChanged: typeof distinctUntilChangedProto;
  }
}