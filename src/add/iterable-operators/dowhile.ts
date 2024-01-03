import { IterableX } from '../../iterable/iterablex.js';
import { doWhile } from '../../iterable/operators/dowhile.js';

/**
 * @ignore
 */
export function doWhileProto<T>(this: IterableX<T>, condition: () => boolean): IterableX<T> {
  return doWhile<T>(condition)(this);
}

IterableX.prototype.doWhile = doWhileProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    doWhile: typeof doWhileProto;
  }
}
