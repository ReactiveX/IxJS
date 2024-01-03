import { IterableX } from '../../iterable/iterablex.js';
import { last } from '../../iterable/last.js';
import { OptionalFindOptions } from '../../iterable/findoptions.js';

/**
 * @ignore
 */
export function lastProto<T>(this: IterableX<T>, options?: OptionalFindOptions<T>): T | undefined {
  return last(this, options as any);
}

IterableX.prototype.last = lastProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    last: typeof lastProto;
  }
}
