import { IterableX } from '../../iterable';
import { catchWith as catchWithStatic } from '../../iterable/catchwith';

export function catchWithProto<T>(this: IterableX<T>, fn: (error: any) => Iterable<T>): IterableX<T> {
  return new IterableX(catchWithStatic<T>(this, fn));
}

IterableX.prototype.catchWith = catchWithProto;

declare module '../../iterable' {
  interface IterableX<T> {
    catchWith: typeof catchWithProto;
  }
}