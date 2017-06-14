import { IterableX } from '../../iterable';
import { single } from '../../iterable/single';

/**
 * @ignore
 */
export function singleProto<T>(
    this: IterableX<T>,
    fn: (value: T) => boolean = () => true): T | undefined {
  return single(this, fn);
}

IterableX.prototype.single = singleProto;

declare module '../../iterable' {
  interface IterableX<T> {
    single: typeof singleProto;
  }
}