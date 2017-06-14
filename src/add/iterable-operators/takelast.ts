import { IterableX } from '../../iterable';
import { takeLast } from '../../iterable/takelast';

/**
 * @ignore
 */
export function takeLastProto<T>(
    this: IterableX<T>,
    count: number): IterableX<T> {
  return takeLast(this, count);
}

IterableX.prototype.takeLast = takeLastProto;

declare module '../../iterable' {
  interface IterableX<T> {
    takeLast: typeof takeLastProto;
  }
}