import { IterableX } from '../../iterable/iterablex';
import { doWhile } from '../../iterable/dowhile';

/**
 * @ignore
 */
export function doWhileProto<TSource>(
  this: IterableX<TSource>,
  condition: () => boolean
): IterableX<TSource> {
  return doWhile(this, condition);
}

IterableX.prototype.doWhile = doWhileProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    doWhile: typeof doWhileProto;
  }
}
