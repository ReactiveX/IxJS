import { Iterable } from '../../iterable';
import { flatMap } from '../../iterable/flatmap';

Iterable.prototype.flatMap = function (fn, resFn) {
  return flatMap(this, fn, resFn);
};

declare module '../../Iterable' {
  interface Iterable<T> {
    flatMap: typeof flatMap;
  }
}