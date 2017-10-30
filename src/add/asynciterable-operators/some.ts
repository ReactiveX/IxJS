import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { some } from '../../asynciterable/some';

/**
 * @ignore
 */

export function someProto<T, S extends T>(
  this: AsyncIterableX<T>,
  predicate: (value: T, index: number) => value is S
): Promise<boolean>;
export function someProto<T>(
  this: AsyncIterableX<T>,
  predicate: (value: T, index: number) => boolean | Promise<boolean>
): Promise<boolean>;
export function someProto<T>(
  this: AsyncIterableX<T>,
  predicate: (value: T, index: number) => boolean | Promise<boolean>
): Promise<boolean> {
  return some(this, predicate);
}

AsyncIterableX.prototype.some = someProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    some: typeof someProto;
  }
}
