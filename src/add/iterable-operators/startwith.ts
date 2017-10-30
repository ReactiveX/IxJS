import { IterableX } from '../../iterable/iterablex';
import { startWith } from '../../iterable/startwith';

/**
 * @ignore
 */
export function startWithProto<T>(this: IterableX<T>, ...args: T[]) {
  return startWith(this, ...args);
}

IterableX.prototype.startWith = startWithProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    startWith: typeof startWithProto;
  }
}
