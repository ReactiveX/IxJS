import { AsyncIterableX } from '../../asynciterable/asynciterablex.js';
import { every } from '../../asynciterable/every.js';
import { FindOptions } from '../../asynciterable/findoptions.js';

/**
 * @ignore
 */
export function everyProto<T>(this: AsyncIterable<T>, options: FindOptions<T>): Promise<boolean> {
  return every(this, options as any);
}

AsyncIterableX.prototype.every = everyProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    every: typeof everyProto;
  }
}
