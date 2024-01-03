import { IterableX } from '../../iterable/iterablex.js';
import { count } from '../../iterable/count.js';
import { OptionalFindOptions } from '../../iterable/findoptions.js';

/**
 * @ignore
 */
export function countProto<T>(this: IterableX<T>, options?: OptionalFindOptions<T>): number {
  return count<T>(this, options);
}

IterableX.prototype.count = countProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    count: typeof countProto;
  }
}
