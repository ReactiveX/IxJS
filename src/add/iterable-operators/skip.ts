import { IterableX } from '../../iterable/iterablex';
import { skip } from '../../iterable/operators/skip';

/**
 * @ignore
 */
export function skipProto<T>(this: IterableX<T>, count: number): IterableX<T> {
  return skip<T>(count)(this);
}

IterableX.prototype.skip = skipProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    skip: typeof skipProto;
  }
}
