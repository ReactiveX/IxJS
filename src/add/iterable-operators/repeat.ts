import { IterableX } from '../../iterable/iterablex.js';
import { repeat } from '../../iterable/operators/repeat.js';

/**
 * @ignore
 */
export function repeatProto<T>(this: IterableX<T>, count = -1): IterableX<T> {
  return repeat<T>(count)(this);
}

IterableX.prototype.repeat = repeatProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    repeat: typeof repeatProto;
  }
}
