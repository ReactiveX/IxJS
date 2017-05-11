import { AsyncIterableX } from '../../asynciterable';
import { onErrorResumeNext } from '../../asynciterable/onerrorresumenext';

export function onErrorResumeNextProto<TSource>(
    this: AsyncIterableX<TSource>,
    ...args: AsyncIterable<TSource>[]): AsyncIterableX<TSource> {
  return new AsyncIterableX(onErrorResumeNext(this, ...args));
}

AsyncIterableX.prototype.onErrorResumeNext = onErrorResumeNextProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    onErrorResumeNext: typeof onErrorResumeNextProto;
  }
}