import { IterableX } from '../../iterable/iterablex';
import { last } from '../../iterable/last';
import { OptionalFindOptions, OptionalFindSubclassedOptions } from '../../iterable/findoptions';

/**
 * @ignore
 */
export function lastProto<T, S extends T>(
  this: IterableX<T>,
  options?: OptionalFindSubclassedOptions<T, S>
): S | undefined;
export function lastProto<T>(this: IterableX<T>, options?: OptionalFindOptions<T>): T | undefined {
  return last(this, options as any);
}

IterableX.prototype.last = lastProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    last: typeof lastProto;
  }
}
