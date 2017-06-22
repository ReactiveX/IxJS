import { AsyncIterableX } from '../../asynciterable';
import { pluck } from '../../asynciterable/pluck';

/**
 * @ignore
 */
export function pluckProto<TSource, TResult>(
    this: AsyncIterableX<TSource>,
    ...args: string[]): AsyncIterableX<TResult> {
  return pluck<TSource, TResult>(this, ...args);
}

AsyncIterableX.prototype.pluck = pluckProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    pluck: typeof pluckProto;
  }
}