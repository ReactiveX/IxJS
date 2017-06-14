import { AsyncIterableX } from '../../asynciterable';
import { forEach } from '../../asynciterable/foreach';

/**
 * @ignore
 */
export function forEachproto<T>(
  this: AsyncIterableX<T>,
  action: (value: T, index: number) => void | Promise<void>): Promise<void> {
  return forEach(this, action);
}

AsyncIterableX.prototype.forEach = forEachproto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    forEach: typeof forEachproto;
  }
}