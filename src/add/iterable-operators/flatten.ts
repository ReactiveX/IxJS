import { IterableX } from '../../iterable';
import { flatten } from '../../iterable/flatten';

function flattenProto<T>(
    this: IterableX<T>,
    depth?: number): IterableX<T> {
  return new IterableX(flatten(this, depth));
}

IterableX.prototype.flatten = flattenProto;

declare module '../../iterable' {
  interface IterableX<T> {
    flatten: typeof flattenProto;
  }
}