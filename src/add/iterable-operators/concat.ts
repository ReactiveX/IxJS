import { Iterable } from '../../iterable';
import { concat } from '../../iterable/concat';

Iterable.prototype.concat = function (this, ...args) {
  return concat(this, ...args);
};

declare module '../../Iterable' {
  interface Iterable<T> {
    concat: typeof concat;
  }
}