import { IterableX } from '../../iterable/iterablex';
import { skipLast } from '../../iterable/operators/skiplast';

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
