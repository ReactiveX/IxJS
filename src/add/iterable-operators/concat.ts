import { Iterable } from '../../iterable';
import { concat } from '../../iterable/concat';

Iterable.prototype.concat = function<T>(...args: Iterable<T>[]) { 
  return concat(this, ...args); 
}

declare module '../../Iterable' {
  interface Iterable<T> {
    concat(...args: Iterable<T>[]): Iterable<T>
  }
}