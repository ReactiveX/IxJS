import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { repeat } from '../../asynciterable/operators/repeat';

/**
 * @ignore
 */
export function repeatProto<T>(this: AsyncIterableX<T>, count: number = -1): AsyncIterableX<T> {
  return repeat<T>(count)(this);
}

AsyncIterableX.prototype.repeat = repeatProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    repeat: typeof repeatProto;
  }
}
