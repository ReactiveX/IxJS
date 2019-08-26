import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { skipUntil } from '../../asynciterable/operators/skipuntil';

/**
 * @ignore
 */
export function skipUntilProto<T>(
  this: AsyncIterableX<T>,
  other: () => Promise<any>
): AsyncIterableX<T> {
  return skipUntil<T>(other)(this);
}

AsyncIterableX.prototype.skipUntil = skipUntilProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    skipUntil: typeof skipUntilProto;
  }
}
