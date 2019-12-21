import { IterableX } from '../../iterable/iterablex';
import { expand } from '../../iterable/operators/expand';

/**
 * @ignore
 */
export function expandProto<T>(this: IterableX<T>, fn: (value: T) => Iterable<T>) {
  return expand(fn)(this);
}

IterableX.prototype.expand = expandProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    expand: typeof expandProto;
  }
}
