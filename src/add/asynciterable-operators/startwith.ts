import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { startWith } from '../../asynciterable/operators/startwith';

/**
 * @ignore
 */
export function startWithProto<T>(this: AsyncIterableX<T>, ...args: T[]) {
  return startWith<T>(...args)(this);
}

AsyncIterableX.prototype.startWith = startWithProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    startWith: typeof startWithProto;
  }
}
