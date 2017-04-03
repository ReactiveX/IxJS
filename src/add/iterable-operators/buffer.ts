import { Iterable } from '../../iterable';
import { buffer } from '../../iterable/buffer';

Iterable.prototype.buffer = function<T>(count: number, skip?: number): Iterable<T[]> {
  return buffer<T>(this, count, skip);
};

declare module '../../Iterable' {
  interface Iterable<T> {
    buffer(count: number, skip?: number): Iterable<T[]>
  }
}