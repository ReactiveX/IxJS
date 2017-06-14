import { AsyncIterableX } from '../../asynciterable';
import { every } from '../../asynciterable/every';

/**
 * @ignore
 */
export function everyProto<T>(
    this: AsyncIterableX<T>,
    comparer: (value: T, index: number) => boolean | Promise<boolean>): Promise<boolean> {
  return every<T>(this, comparer);
}

AsyncIterableX.prototype.every = everyProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    every: typeof everyProto;
  }
}
