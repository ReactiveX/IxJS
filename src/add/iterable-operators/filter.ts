import { IterableImpl } from '../../iterable';
import { filter } from '../../iterable/filter';

function filterProto<T>(this: IterableImpl<T>, fn: (value: T, index: number) => boolean, thisArg?: any): Iterable<T> {
  return filter(this, fn, thisArg);
};

IterableImpl.prototype.filter = filterProto;

declare module '../../Iterable' {
  interface IterableImpl<T> {
    filter: typeof filterProto;
  }
}
