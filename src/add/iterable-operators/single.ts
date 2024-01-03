import { IterableX } from '../../iterable/iterablex.js';
import { single } from '../../iterable/single.js';
import { OptionalFindOptions } from '../../iterable/findoptions.js';

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
