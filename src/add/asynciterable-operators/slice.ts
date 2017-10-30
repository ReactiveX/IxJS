import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { slice } from '../../asynciterable/slice';

/**
 * @ignore
 */
export function sliceProto<T>(
  this: AsyncIterableX<T>,
  begin: number,
  end: number
): AsyncIterableX<T> {
  return slice(this, begin, end);
}

AsyncIterableX.prototype.slice = sliceProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    slice: typeof sliceProto;
  }
}
