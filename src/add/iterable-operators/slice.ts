import { IterableX } from '../../iterable/iterablex';
import { slice } from '../../iterable/operators/slice';

/**
 * @ignore
 */
export function sliceProto<T>(this: IterableX<T>, begin: number, end: number): IterableX<T> {
  return slice<T>(begin, end)(this);
}

IterableX.prototype.slice = sliceProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    slice: typeof sliceProto;
  }
}
