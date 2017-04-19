import { IterableX } from '../../iterable';
import { filter } from '../../iterable/filter';

export function filterProto<T>(this: IterableX<T>, fn: (value: T, index: number) => boolean, thisArg?: any): Iterable<T> {
  return filter(this, fn, thisArg);
};

IterableX.prototype.filter = filterProto;

declare module '../../Iterable' {
  interface IterableX<T> {
    filter: typeof filterProto;
  }
}
