import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { flatten } from '../../asynciterable/flatten';

/**
 * @ignore
 */
export function flattenProto<T>(this: AsyncIterableX<T>, depth?: number): AsyncIterableX<T> {
  return flatten(this, depth);
}

AsyncIterableX.prototype.flatten = flattenProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    flatten: typeof flattenProto;
  }
}
