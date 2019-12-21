import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { reverse } from '../../asynciterable/operators/reverse';

/**
 * @ignore
 */
export function reverseProto<T>(this: AsyncIterableX<T>): AsyncIterableX<T> {
  return reverse<T>()(this);
}

AsyncIterableX.prototype.reverse = reverseProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    reverse: typeof reverseProto;
  }
}
