import { IterableX } from '../../iterable/iterablex.js';
import { takeLast } from '../../iterable/operators/takelast.js';

/**
 * @ignore
 */
export function takeLastProto<T>(this: IterableX<T>, count: number): IterableX<T> {
  return takeLast<T>(count)(this);
}

IterableX.prototype.takeLast = takeLastProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    takeLast: typeof takeLastProto;
  }
}
