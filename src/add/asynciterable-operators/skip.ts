import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { skip } from '../../asynciterable/skip';

/**
 * @ignore
 */
export function skipProto<T>(this: AsyncIterableX<T>, count: number): AsyncIterableX<T> {
  return skip(this, count);
}

AsyncIterableX.prototype.skip = skipProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    skip: typeof skipProto;
  }
}
