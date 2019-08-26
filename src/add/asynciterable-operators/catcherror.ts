import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { catchError as _catchError } from '../../asynciterable/operators/catcherror';

/**
 * @ignore
 */
export function catchProto<T>(
  this: AsyncIterableX<T>,
  handler: (error: any) => AsyncIterable<T> | Promise<AsyncIterable<T>>
): AsyncIterableX<T> {
  return _catchError<T>(handler)(this);
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
