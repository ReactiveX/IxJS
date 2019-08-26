import { IterableX } from '../../iterable/iterablex';
import { catchError } from '../../iterable/operators/catcherror';

/**
 * @ignore
 */
export function catchErrorProto<T>(
  this: IterableX<T>,
  fn: (error: any) => Iterable<T>
): IterableX<T> {
  return catchError<T>(fn)(this);
}

IterableX.prototype.catchError = catchErrorProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    catchError: typeof catchErrorProto;
  }
}
