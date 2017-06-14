import { IterableX } from '../../iterable';
import { doWhile } from '../../iterable/dowhile';

/**
 * @ignore
 */
export function doWhileProto<TSource>(this: Iterable<TSource>, condition: () => boolean): IterableX<TSource> {
  return doWhile(this, condition);
}

IterableX.prototype.doWhile = doWhileProto;

declare module '../../iterable' {
  interface IterableX<T> {
    doWhile: typeof doWhileProto;
  }
}