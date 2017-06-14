import { AsyncIterableX } from '../../asynciterable';
import { flatten } from '../../asynciterable/flatten';

/**
 * @ignore
 */
export function flattenProto<T>(
    this: AsyncIterableX<T>,
    depth?: number): AsyncIterableX<T> {
  return flatten(this, depth);
}

AsyncIterableX.prototype.flatten = flattenProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    flatten: typeof flattenProto;
  }
}