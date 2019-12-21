import { IterableX } from '../../iterable/iterablex';
import { tap } from '../../iterable/operators/tap';
import { PartialObserver } from '../../observer';

/**
 * @ignore
 */
export function tapProto<T>(this: IterableX<T>, observer: PartialObserver<T>): IterableX<T> {
  return tap<T>(observer)(this);
}

IterableX.prototype.tap = tapProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    tap: typeof tapProto;
  }
}
