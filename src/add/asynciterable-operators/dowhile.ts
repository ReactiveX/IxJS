import { AsyncIterableX } from '../../asynciterable';
import { doWhile } from '../../asynciterable/dowhile';

export function doWhileProto<TSource>(this: AsyncIterable<TSource>, condition: () => boolean): AsyncIterableX<TSource> {
  return doWhile(this, condition);
}

AsyncIterableX.prototype.doWhile = doWhileProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    doWhile: typeof doWhileProto;
  }
}