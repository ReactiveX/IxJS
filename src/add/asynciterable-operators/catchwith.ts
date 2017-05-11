import { AsyncIterableX } from '../../asynciterable';
import { catchWith as catchWithStatic } from '../../asynciterable/catchwith';

export function catchWithProto<T>(this: AsyncIterableX<T>, fn: (error: any) => AsyncIterable<T>): AsyncIterableX<T> {
  return new AsyncIterableX(catchWithStatic<T>(this, fn));
}

AsyncIterableX.prototype.catchWith = catchWithProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    catchWith: typeof catchWithProto;
  }
}