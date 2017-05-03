import { IterableX } from '../../iterable';
import { skip } from '../../iterable/skip';

export function skipProto<T>(
    this: IterableX<T>,
    count: number): IterableX<T> {
  return new IterableX(skip(this, count));
}

IterableX.prototype.skip = skipProto;

declare module '../../iterable' {
  interface IterableX<T> {
    skip: typeof skipProto;
  }
}