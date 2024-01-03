import { IterableX } from '../../iterable/iterablex.js';
import { reverse } from '../../iterable/operators/reverse.js';

/**
 * @ignore
 */
export function reverseProto<T>(this: IterableX<T>): IterableX<T> {
  return reverse<T>()(this);
}

IterableX.prototype.reverse = reverseProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    reverse: typeof reverseProto;
  }
}
