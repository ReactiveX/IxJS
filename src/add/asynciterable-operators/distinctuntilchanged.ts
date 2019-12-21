import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { distinctUntilChanged } from '../../asynciterable/operators/distinctuntilchanged';

/**
 * @ignore
 */
export function distinctUntilChangedProto<T, TKey>(
  this: AsyncIterableX<T>,
  keySelector?: (value: T) => TKey | Promise<TKey>,
  comparer?: (x: TKey, y: TKey) => boolean | Promise<boolean>
): AsyncIterableX<T> {
  return distinctUntilChanged(keySelector, comparer)(this);
}

AsyncIterableX.prototype.distinctUntilChanged = distinctUntilChangedProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    distinctUntilChanged: typeof distinctUntilChangedProto;
  }
}
