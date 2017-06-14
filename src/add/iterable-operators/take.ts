import { IterableX } from '../../iterable';
import { take } from '../../iterable/take';

/**
 * @ignore
 */
export function takeProto<T>(
    this: IterableX<T>,
    count: number): IterableX<T> {
  return take(this, count);
}

IterableX.prototype.take = takeProto;

declare module '../../iterable' {
  interface IterableX<T> {
    take: typeof takeProto;
  }
}