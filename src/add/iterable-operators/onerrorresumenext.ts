import { IterableX } from '../../iterable';
import { onErrorResumeNext } from '../../iterable/onerrorresumenext';

export function onErrorResumeNextProto<TSource>(
    this: IterableX<TSource>,
    ...args: Iterable<TSource>[]): IterableX<TSource> {
  return new IterableX(onErrorResumeNext(this, ...args));
}

IterableX.prototype.onErrorResumeNext = onErrorResumeNextProto;

declare module '../../iterable' {
  interface IterableX<T> {
    onErrorResumeNext: typeof onErrorResumeNextProto;
  }
}