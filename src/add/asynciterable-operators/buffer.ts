import { AsyncIterableX } from '../../asynciterable/asynciterablex.js';
import { buffer } from '../../asynciterable/operators/buffer.js';

/**
 * @ignore
 */
export function bufferProto<T>(
  this: AsyncIterableX<T>,
  count: number,
  skip?: number
): AsyncIterableX<T[]> {
  return buffer<T>(count, skip)(this);
}

AsyncIterableX.prototype.buffer = bufferProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    buffer: typeof bufferProto;
  }
}
