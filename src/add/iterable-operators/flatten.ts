import { IterableX } from '../../iterable/iterablex';
import { flatten } from '../../iterable/flatten';

/**
 * @ignore
 */
export function flattenProto<T>(this: IterableX<T>, depth?: number): IterableX<T> {
  return flatten(this, depth);
}

IterableX.prototype.flatten = flattenProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    flatten: typeof flattenProto;
  }
}
