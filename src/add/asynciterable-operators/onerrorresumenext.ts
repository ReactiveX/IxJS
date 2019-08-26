import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { onErrorResumeNext } from '../../asynciterable/onerrorresumenext';

/**
 * @ignore
 */
export function onErrorResumeNextProto<TSource>(
  this: AsyncIterableX<TSource>,
  ...args: AsyncIterable<TSource>[]
): AsyncIterableX<TSource> {
  return onErrorResumeNext(this, ...args);
}

AsyncIterableX.prototype.onErrorResumeNext = onErrorResumeNextProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    onErrorResumeNext: typeof onErrorResumeNextProto;
  }
}
