import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { pluck } from '../../asynciterable/operators/pluck';

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
