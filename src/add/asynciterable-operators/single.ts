import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { single } from '../../asynciterable/single';
import {
  OptionalFindSubclassedOptions,
  OptionalFindOptions,
} from '../../asynciterable/findoptions';

/**
 * @ignore
 */
export function singleProto<T, S extends T>(
  this: AsyncIterable<T>,
  options?: OptionalFindSubclassedOptions<T, S>
): Promise<S | undefined>;
export function singleProto<T>(
  this: AsyncIterable<T>,
  options?: OptionalFindOptions<T>
): Promise<T | undefined> {
  return single(this, options as any);
}

AsyncIterableX.prototype.single = singleProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    single: typeof singleProto;
  }
}
