import { Iterable } from '../../iterable';
import { map } from '../../iterable/map';

Iterable.prototype.map = function (fn, thisArg) {
  return map(this, fn, thisArg);
};

declare module '../../Iterable' {
  interface Iterable<T> {
    map: typeof map;
  }
}