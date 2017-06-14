import { IterableX } from '../../iterable';
import { map } from '../../iterable/map';

/**
 * @ignore
 */
export function mapProto<T, U>(
    this: IterableX<T>,
    fn: (value: T, index: number) => U,
    thisArg?: any): IterableX<U> {
  return map<T, U>(this, fn, thisArg);
}

IterableX.prototype.map = mapProto;

declare module '../../iterable' {
  interface IterableX<T> {
    map: typeof mapProto;
  }
}