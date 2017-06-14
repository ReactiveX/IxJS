import { AsyncIterableX } from '../../asynciterable';
import { skipWhile } from '../../asynciterable/skipwhile';

/**
 * @ignore
 */
export function skipWhileProto<TSource>(
    this: AsyncIterableX<TSource>,
    predicate: (value: TSource, index: number) => boolean | Promise<boolean>): AsyncIterableX<TSource> {
  return skipWhile(this, predicate);
}

AsyncIterableX.prototype.skipWhile = skipWhileProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    skipWhile: typeof skipWhileProto;
  }
}