import { IterableX } from '../../iterable/iterablex';
import { repeat } from '../../iterable/repeat';

/**
 * @ignore
 */
export function repeatProto<TSource>(
  this: IterableX<TSource>,
  count: number = -1
): IterableX<TSource> {
  return repeat(this, count);
}

IterableX.prototype.repeat = repeatProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    repeat: typeof repeatProto;
  }
}
