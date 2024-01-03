import { IterableX } from '../../iterable/iterablex.js';
import { first } from '../../iterable/first.js';
import { OptionalFindOptions } from '../../iterable/findoptions.js';

/**
 * @ignore
 */
export function firstProto<T>(this: IterableX<T>, options?: OptionalFindOptions<T>): T | undefined {
  return first(this, options as any);
}

IterableX.prototype.first = firstProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    first: typeof firstProto;
  }
}
