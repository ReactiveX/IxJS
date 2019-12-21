import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { slice } from '../../asynciterable/operators/slice';

/**
 * @ignore
 */
export function sliceProto<T>(
  this: AsyncIterableX<T>,
  begin: number,
  end: number
): AsyncIterableX<T> {
  return slice<T>(begin, end)(this);
}

AsyncIterableX.prototype.slice = sliceProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    slice: typeof sliceProto;
  }
}
