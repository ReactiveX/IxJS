import { IterableX } from '../../iterable';
import { endWith } from '../../iterable/endwith';

/**
 * @ignore
 */
export function endWithProto<T>(this: IterableX<T>, ...args: T[]) {
  return endWith(this, ...args);
}

IterableX.prototype.endWith = endWithProto;

declare module '../../iterable' {
  interface IterableX<T> {
    endWith: typeof endWithProto;
  }
}
