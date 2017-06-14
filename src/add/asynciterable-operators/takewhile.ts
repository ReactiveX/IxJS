import { AsyncIterableX } from '../../asynciterable';
import { takeWhile } from '../../asynciterable/takewhile';

/**
 * @ignore
 */
export function takeWhileProto<TSource>(
    this: AsyncIterableX<TSource>,
    predicate: (value: TSource, index: number) => boolean | Promise<boolean>): AsyncIterableX<TSource> {
  return takeWhile(this, predicate);
}

AsyncIterableX.prototype.takeWhile = takeWhileProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    takeWhile: typeof takeWhileProto;
  }
}