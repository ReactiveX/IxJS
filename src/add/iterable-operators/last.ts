import { IterableX } from '../../iterable';
import { last } from '../../iterable/last';

/**
 * @ignore
 */
export function lastProto<T>(
    this: IterableX<T>,
    fn: (value: T) => boolean = () => true): T | undefined {
  return last(this, fn);
}

IterableX.prototype.last = lastProto;

declare module '../../iterable' {
  interface IterableX<T> {
    last: typeof lastProto;
  }
}