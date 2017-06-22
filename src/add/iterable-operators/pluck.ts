import { IterableX } from '../../iterable';
import { pluck } from '../../iterable/pluck';

/**
 * @ignore
 */
export function pluckProto<TSource, TResult>(
    this: IterableX<TSource>,
    ...args: string[]): IterableX<TResult> {
  return pluck<TSource, TResult>(this, ...args);
}

IterableX.prototype.pluck = pluckProto;

declare module '../../iterable' {
  interface IterableX<T> {
    pluck: typeof pluckProto;
  }
}