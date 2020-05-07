import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { every } from '../../asynciterable/every';
import { FindSubclassedOptions, FindOptions } from '../../asynciterable/findoptions';

/**
 * @ignore
 */
export function everyProto<T, S extends T>(
  this: AsyncIterable<T>,
  options: FindSubclassedOptions<T, S>
): Promise<boolean>;
export function everyProto<T>(this: AsyncIterable<T>, options: FindOptions<T>): Promise<boolean> {
  return every(this, options as any);
}

AsyncIterableX.prototype.every = everyProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    every: typeof everyProto;
  }
}
