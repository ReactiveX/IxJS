import { IterableX } from '../../iterable/iterablex.js';
import { expand } from '../../iterable/operators/expand.js';

/**
 * @ignore
 */
export function expandProto<T>(this: IterableX<T>, fn: (value: T) => Iterable<T>): IterableX<T> {
  return expand(fn)(this);
}

IterableX.prototype.expand = expandProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    expand: typeof expandProto;
  }
}
