import { IterableX } from '../../iterable/iterablex';
import { single } from '../../iterable/single';
import { OptionalFindOptions } from '../../iterable/findoptions';

/**
 * @ignore
 */
export function singleProto<T>(
  this: IterableX<T>,
  options?: OptionalFindOptions<T>
): T | undefined {
  return single(this, options as any);
}

IterableX.prototype.single = singleProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    single: typeof singleProto;
  }
}
