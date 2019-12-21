import { IterableX } from '../../iterable/iterablex';
import { take } from '../../iterable/operators/take';

/**
 * @ignore
 */
export function takeProto<T>(this: IterableX<T>, count: number): IterableX<T> {
  return take<T>(count)(this);
}

IterableX.prototype.take = takeProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    take: typeof takeProto;
  }
}
