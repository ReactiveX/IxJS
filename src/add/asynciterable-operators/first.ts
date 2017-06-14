import { AsyncIterableX } from '../../asynciterable';
import { first } from '../../asynciterable/first';

/**
 * @ignore
 */
export function firstProto<T>(
    this: AsyncIterableX<T>,
    fn?: (value: T) => boolean | Promise<boolean>): Promise<T | undefined> {
  return first(this, fn);
}

AsyncIterableX.prototype.first = firstProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    first: typeof firstProto;
  }
}