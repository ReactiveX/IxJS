import { IterableX } from '../../iterable/iterablex.js';
import { skipLast } from '../../iterable/operators/skiplast.js';

/**
 * @ignore
 */
export function skipLastProto<T>(this: IterableX<T>, count: number): IterableX<T> {
  return skipLast<T>(count)(this);
}

IterableX.prototype.skipLast = skipLastProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    skipLast: typeof skipLastProto;
  }
}
