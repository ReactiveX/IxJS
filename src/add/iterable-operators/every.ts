import { IterableX } from '../../iterable';
import { every } from '../../iterable/every';

/**
 * @ignore
 */
export function everyProto<T>(
    this: IterableX<T>,
    comparer: (value: T, index: number) => boolean): boolean {
  return every<T>(this, comparer);
}

IterableX.prototype.every = everyProto;

declare module '../../iterable' {
  interface IterableX<T> {
    every: typeof everyProto;
  }
}
