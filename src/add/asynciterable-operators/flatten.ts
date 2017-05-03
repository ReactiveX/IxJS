import { AsyncIterableX } from '../../asynciterable';
import { flatten } from '../../asynciterable/flatten';

export function flattenProto<T>(
    this: AsyncIterableX<T>,
    depth?: number): AsyncIterableX<T> {
  return new AsyncIterableX(flatten(this, depth));
}

AsyncIterableX.prototype.flatten = flattenProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    flatten: typeof flattenProto;
  }
}