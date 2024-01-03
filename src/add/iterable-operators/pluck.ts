import { IterableX } from '../../iterable/iterablex.js';
import { pluck } from '../../iterable/operators/pluck.js';

/**
 * @ignore
 */
export function pluckProto<T, R>(this: IterableX<T>, ...args: string[]): IterableX<R> {
  return pluck<T, R>(...args)(this);
}

IterableX.prototype.pluck = pluckProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    pluck: typeof pluckProto;
  }
}
