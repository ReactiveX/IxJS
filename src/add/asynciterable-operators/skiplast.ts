import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { skipLast } from '../../asynciterable/skiplast';

/**
 * @ignore
 */
export function skipLastProto<T>(this: AsyncIterableX<T>, count: number): AsyncIterableX<T> {
  return skipLast(this, count);
}

AsyncIterableX.prototype.skipLast = skipLastProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    skipLast: typeof skipLastProto;
  }
}
