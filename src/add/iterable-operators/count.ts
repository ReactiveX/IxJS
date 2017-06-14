import { IterableX } from '../../iterable';
import { count } from '../../iterable/count';

/**
 * @ignore
 */
export function countProto<T>(
    this: IterableX<T>,
    fn?: (value: T) => boolean): number {
  return count<T>(this, fn);
}

IterableX.prototype.count = countProto;

declare module '../../iterable' {
  interface IterableX<T> {
    count: typeof countProto;
  }
}