import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { catchError as _catchError } from '../../asynciterable/operators/catcherror';

/**
 * @ignore
 */
export function catchProto<T, R>(
  this: AsyncIterableX<T>,
  handler: (error: any) => AsyncIterable<R> | Promise<AsyncIterable<R>>
): AsyncIterableX<T | R> {
  return _catchError<T, R>(handler)(this);
}

AsyncIterableX.prototype.catchError = catchProto;

export declare namespace asynciterable {
  let catchError: typeof _catchError;
}

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    catchError: typeof catchProto;
  }
}
