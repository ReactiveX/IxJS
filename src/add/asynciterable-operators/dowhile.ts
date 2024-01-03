import { AsyncIterableX } from '../../asynciterable/asynciterablex.js';
import { doWhile } from '../../asynciterable/operators/dowhile.js';

/**
 * @ignore
 */
export function doWhileProto<T>(
  this: AsyncIterableX<T>,
  condition: () => boolean | Promise<boolean>
): AsyncIterableX<T> {
  return doWhile<T>(condition)(this);
}

AsyncIterableX.prototype.doWhile = doWhileProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    doWhile: typeof doWhileProto;
  }
}
