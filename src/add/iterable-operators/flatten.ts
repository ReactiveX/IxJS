import { IterableX } from '../../iterable';
import { flatten } from '../../iterable/flatten';

export function flattenProto<T>(
    this: IterableX<T>,
    depth?: number): IterableX<T> {
  return flatten(this, depth);
}

IterableX.prototype.flatten = flattenProto;

declare module '../../iterable' {
  interface IterableX<T> {
    flatten: typeof flattenProto;
  }
}