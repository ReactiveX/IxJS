import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { _catch as _catchProto } from '../../asynciterable/catch';

/**
 * @ignore
 */
export function catchProto<T>(
  this: AsyncIterableX<T>,
  ...args: AsyncIterable<T>[]
): AsyncIterableX<T> {
  return _catchProto<T>(this, ...args);
}

AsyncIterableX.prototype.catch = catchProto;

export declare namespace asynciterable {
  let _catch: typeof _catchProto;
}

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    catch: typeof catchProto;
  }
}
