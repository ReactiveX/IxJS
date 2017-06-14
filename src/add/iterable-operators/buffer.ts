import { IterableX } from '../../iterable';
import { buffer } from '../../iterable/buffer';

/**
 * @ignore
 */
export function bufferProto<T>(this: IterableX<T>, count: number, skip?: number): IterableX<T[]> {
  return buffer<T>(this, count, skip);
}

IterableX.prototype.buffer = bufferProto;

declare module '../../iterable' {
  interface IterableX<T> {
    buffer: typeof bufferProto;
  }
}