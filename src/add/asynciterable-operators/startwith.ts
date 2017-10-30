import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { startWith } from '../../asynciterable/startwith';

/**
 * @ignore
 */
export function startWithProto<T>(this: AsyncIterableX<T>, ...args: T[]) {
  return startWith(this, ...args);
}

AsyncIterableX.prototype.startWith = startWithProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    startWith: typeof startWithProto;
  }
}
