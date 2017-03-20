import { Iterable } from '../../iterable';
import { filter } from '../../iterable/filter';

Iterable.prototype.filter = function (this, fn, thisArg) {
  return filter(this, fn, thisArg);
};

declare module '../../Iterable' {
  interface Iterable<T> {
    filter: typeof filter;
  }
}