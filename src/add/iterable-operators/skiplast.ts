import { IterableX } from '../../iterable';
import { skipLast } from '../../iterable/skiplast';

/**
 * @ignore
 */
export function skipLastProto<T>(
    this: IterableX<T>,
    count: number): IterableX<T> {
  return skipLast(this, count);
}

IterableX.prototype.skipLast = skipLastProto;

declare module '../../iterable' {
  interface IterableX<T> {
    skipLast: typeof skipLastProto;
  }
}