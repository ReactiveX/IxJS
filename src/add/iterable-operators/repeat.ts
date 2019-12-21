import { IterableX } from '../../iterable/iterablex';
import { repeat } from '../../iterable/operators/repeat';

/**
 * @ignore
 */
export function repeatProto<T>(this: IterableX<T>, count: number = -1): IterableX<T> {
  return repeat<T>(count)(this);
}

IterableX.prototype.repeat = repeatProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    repeat: typeof repeatProto;
  }
}
