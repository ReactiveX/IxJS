import { IterableX } from '../../iterable/iterablex';
import { some } from '../../iterable/some';
import { FindSubclassedOptions, FindOptions } from '../../iterable/findoptions';

/**
 * @ignore
 */
export function someProto<T, S extends T>(
  this: IterableX<T>,
  options: FindSubclassedOptions<T, S>
): boolean;
export function someProto<T>(this: IterableX<T>, options: FindOptions<T>): boolean {
  return some(this, options as any);
}

IterableX.prototype.some = someProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    some: typeof someProto;
  }
}
