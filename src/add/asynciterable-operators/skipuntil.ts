import { AsyncIterableX } from '../../asynciterable';
import { skipUntil } from '../../asynciterable/skipuntil';

/**
 * @ignore
 */
export function skipUntilProto<TSource>(
    this: AsyncIterable<TSource>,
    other: Promise<any>): AsyncIterableX<TSource> {
  return skipUntil(this, other);
}

AsyncIterableX.prototype.skipUntil = skipUntilProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    skipUntil: typeof skipUntilProto;
  }
}