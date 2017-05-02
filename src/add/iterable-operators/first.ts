import { IterableX } from '../../iterable';
import { first } from '../../iterable/first';

function firstProto<T>(
    this: IterableX<T>,
    fn?: (value: T) => boolean): T | undefined {
  return first(this, fn);
}

IterableX.prototype.first = firstProto;

declare module '../../iterable' {
  interface IterableX<T> {
    first: typeof firstProto;
  }
}