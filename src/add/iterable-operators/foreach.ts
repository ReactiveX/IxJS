import { IterableX } from '../../iterable';
import { forEach } from '../../iterable/foreach';

/**
 * @ignore
 */
export function forEachproto<T>(
    this: IterableX<T>,
    fn: (value: T, index: number) => void): void {
  return forEach(this, fn);
}

IterableX.prototype.forEach = forEachproto;

declare module '../../iterable' {
  interface IterableX<T> {
    forEach: typeof forEachproto;
  }
}