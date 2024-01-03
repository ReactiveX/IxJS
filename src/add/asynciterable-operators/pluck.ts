import { AsyncIterableX } from '../../asynciterable/asynciterablex.js';
import { pluck } from '../../asynciterable/operators/pluck.js';

/**
 * @ignore
 */
export function pluckProto<T, R>(this: AsyncIterableX<T>, ...args: string[]): AsyncIterableX<R> {
  return pluck<T, R>(...args)(this);
}

AsyncIterableX.prototype.pluck = pluckProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    pluck: typeof pluckProto;
  }
}
