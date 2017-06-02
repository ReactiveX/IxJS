import { AsyncIterableX } from '../../asynciterable';
import { forEach } from '../../asynciterable/foreach';

export function forEachproto<T>(
  this: AsyncIterableX<T>,
  fn: (value: T, index: number) => void): Promise<void> {
  return forEach(this, fn);
}

AsyncIterableX.prototype.forEach = forEachproto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    forEach: typeof forEachproto;
  }
}