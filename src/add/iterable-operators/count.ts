import { IterableX } from '../../iterable/iterablex';
import { count } from '../../iterable/count';
import { OptionalFindOptions } from '../../iterable/findoptions';

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
