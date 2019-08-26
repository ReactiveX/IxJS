import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { every } from '../../asynciterable/every';

/**
 * @ignore
 */
export function everyProto<T, S extends T>(
  this: AsyncIterableX<T>,
  predicate: (value: T, index: number) => value is S
): Promise<boolean>;
export function everyProto<T>(
  this: AsyncIterableX<T>,
  predicate: (value: T, index: number) => boolean | Promise<boolean>
): Promise<boolean>;
export function everyProto<T>(
  this: AsyncIterableX<T>,
  predicate: (value: T, index: number) => boolean | Promise<boolean>
): Promise<boolean> {
  return every<T>(this, predicate);
}

AsyncIterableX.prototype.every = everyProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    every: typeof everyProto;
  }
}
