import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { doWhile } from '../../asynciterable/dowhile';

/**
 * @ignore
 */
export function doWhileProto<TSource>(
  this: AsyncIterableX<TSource>,
  condition: () => boolean | Promise<boolean>
): AsyncIterableX<TSource> {
  return doWhile(this, condition);
}

AsyncIterableX.prototype.doWhile = doWhileProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    doWhile: typeof doWhileProto;
  }
}
