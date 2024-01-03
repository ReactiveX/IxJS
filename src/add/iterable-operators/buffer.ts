import { IterableX } from '../../iterable/iterablex.js';
import { buffer } from '../../iterable/operators/buffer.js';

/**
 * @ignore
 */
export function bufferProto<T>(this: IterableX<T>, count: number, skip?: number): IterableX<T[]> {
  return buffer<T>(count, skip)(this);
}

IterableX.prototype.buffer = bufferProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    buffer: typeof bufferProto;
  }
}
