import { AsyncIterableX } from '../../asynciterable';
import { distinctUntilChanged } from '../../asynciterable/distinctuntilchanged';

export function distinctUntilChangedProto<TSource, TKey>(
    this: AsyncIterableX<TSource>,
    keySelector?: (value: TSource) => TKey,
    cmp?: (x: TKey, y: TKey) => boolean): AsyncIterableX<TSource> {
  return distinctUntilChanged(this, keySelector, cmp);
}

AsyncIterableX.prototype.distinctUntilChanged = distinctUntilChangedProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    distinctUntilChanged: typeof distinctUntilChangedProto;
  }
}