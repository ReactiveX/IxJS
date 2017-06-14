import { AsyncIterableX } from '../../asynciterable';
import { distinctUntilChanged } from '../../asynciterable/distinctuntilchanged';

/**
 * @ignore
 */
export function distinctUntilChangedProto<TSource, TKey>(
    this: AsyncIterableX<TSource>,
    keySelector?: (value: TSource) => TKey | Promise<TKey>,
    comparer?: (x: TKey, y: TKey) => boolean | Promise<boolean>): AsyncIterableX<TSource> {
  return distinctUntilChanged(this, keySelector, comparer);
}

AsyncIterableX.prototype.distinctUntilChanged = distinctUntilChangedProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    distinctUntilChanged: typeof distinctUntilChangedProto;
  }
}