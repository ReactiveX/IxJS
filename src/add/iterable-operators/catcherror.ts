import { IterableX } from '../../iterable/iterablex';
import { catchError } from '../../iterable/operators/catcherror';

/**
 * @ignore
 */
export function catchErrorProto<T, R>(
  this: IterableX<T>,
  fn: (error: any) => Iterable<R>
): IterableX<T | R> {
  return catchError<T, R>(fn)(this);
}

IterableX.prototype.catchError = catchErrorProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    catchError: typeof catchErrorProto;
  }
}
