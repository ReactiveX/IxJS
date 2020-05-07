import { IterableX } from '../../iterable/iterablex';
import { find } from '../../iterable/find';
import { FindOptions, FindSubclassedOptions } from 'ix/iterable/findoptions';

/**
 * @ignore
 */
export function findProto<T, S extends T>(
  this: IterableX<T>,
  options: FindSubclassedOptions<T, S>
): Promise<S | undefined>;
export function findProto<T>(this: IterableX<T>, options: FindOptions<T>): T | undefined {
  return find(this, options as any);
}

IterableX.prototype.find = findProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    find: typeof findProto;
  }
}
