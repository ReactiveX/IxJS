import { IterableX } from '../../iterable/iterablex';
import { onErrorResumeNext } from '../../iterable/onerrorresumenext';

/**
 * @ignore
 */
export function onErrorResumeNextProto<TSource>(
  this: IterableX<TSource>,
  ...args: Iterable<TSource>[]
): IterableX<TSource> {
  return onErrorResumeNext(this, ...args);
}

IterableX.prototype.onErrorResumeNext = onErrorResumeNextProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    onErrorResumeNext: typeof onErrorResumeNextProto;
  }
}
