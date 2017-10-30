import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { buffer } from '../../asynciterable/buffer';

/**
 * @ignore
 */
export function bufferProto<T>(
  this: AsyncIterableX<T>,
  count: number,
  skip?: number
): AsyncIterableX<T[]> {
  return buffer<T>(this, count, skip);
}

AsyncIterableX.prototype.buffer = bufferProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    buffer: typeof bufferProto;
  }
}
