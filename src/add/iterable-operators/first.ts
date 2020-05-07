import { IterableX } from '../../iterable/iterablex';
import { first } from '../../iterable/first';
import { OptionalFindOptions, OptionalFindSubclassedOptions } from '../../iterable/findoptions';

/**
 * @ignore
 */
export function firstProto<T, S extends T>(
  this: IterableX<T>,
  options?: OptionalFindSubclassedOptions<T, S>
): S | undefined;
export function firstProto<T>(this: IterableX<T>, options?: OptionalFindOptions<T>): T | undefined {
  return first(this, options as any);
}

IterableX.prototype.first = firstProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    first: typeof firstProto;
  }
}
