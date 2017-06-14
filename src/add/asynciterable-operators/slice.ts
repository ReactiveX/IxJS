import { AsyncIterableX } from '../../asynciterable';
import { slice } from '../../asynciterable/slice';

/**
 * @ignore
 */
export function sliceProto<T>(
    this: AsyncIterableX<T>,
    begin: number,
    end: number): AsyncIterableX<T> {
  return slice(this, begin, end);
}

AsyncIterableX.prototype.slice = sliceProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    slice: typeof sliceProto;
  }
}