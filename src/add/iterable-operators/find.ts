import { IterableX } from '../../iterable/iterablex';
import { find } from '../../iterable/find';
import { FindOptions } from 'ix/iterable/findoptions';

/**
 * @ignore
 */
export function findProto<T>(this: IterableX<T>, options: FindOptions<T>): T | undefined {
  return find(this, options as any);
}

IterableX.prototype.find = findProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    find: typeof findProto;
  }
}
