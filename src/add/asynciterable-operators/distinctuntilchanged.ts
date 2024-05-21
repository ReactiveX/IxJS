import { AsyncIterableX } from '../../asynciterable/asynciterablex.js';
import { distinctUntilChanged } from '../../asynciterable/operators/distinctuntilchanged.js';
import { DistinctOptions } from '../../asynciterable/operators/distinctoptions.js';

/**
 * @ignore
 */
export function distinctUntilChangedProto<TSource, TKey>(
  this: AsyncIterableX<TSource>,
  options?: DistinctOptions<TSource, TKey>
): AsyncIterableX<TSource> {
  return distinctUntilChanged(options)(this);
}

AsyncIterableX.prototype.distinctUntilChanged = distinctUntilChangedProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    distinctUntilChanged: typeof distinctUntilChangedProto;
  }
}
