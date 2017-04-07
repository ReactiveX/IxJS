import { IterableImpl } from '../../iterable';
import { buffer } from '../../iterable/buffer';

function bufferProto <T>(this: IterableImpl<T>, count: number, skip?: number): IterableImpl<T[]> {
  return buffer<T>(this, count, skip);
};

IterableImpl.prototype.buffer = bufferProto;

declare module '../../Iterable' {
  interface IterableImpl<T> {
    buffer: typeof bufferProto;
  }
}