import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { catchWith as catchWithStatic } from '../../asynciterable/catchwith';

/**
 * @ignore
 */
export function catchWithProto<T>(
  this: AsyncIterableX<T>,
  selector: (error: any) => AsyncIterable<T> | Promise<AsyncIterable<T>>
): AsyncIterableX<T> {
  return catchWithStatic<T>(this, selector);
}

AsyncIterableX.prototype.catchWith = catchWithProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    catchWith: typeof catchWithProto;
  }
}
