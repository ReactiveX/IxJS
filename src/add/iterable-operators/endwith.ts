import { IterableX } from '../../iterable/iterablex.js';
import { endWith } from '../../iterable/operators/endwith.js';

/**
 * @ignore
 */
export function endWithProto<T>(this: IterableX<T>, ...args: T[]) {
  return endWith<T>(...args)(this);
}

IterableX.prototype.endWith = endWithProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    endWith: typeof endWithProto;
  }
}
