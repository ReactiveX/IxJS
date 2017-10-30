import { IterableX } from '../../iterable/iterablex';
import { catchWith as catchWithStatic } from '../../iterable/catchwith';

/**
 * @ignore
 */
export function catchWithProto<T>(
  this: IterableX<T>,
  fn: (error: any) => Iterable<T>
): IterableX<T> {
  return catchWithStatic<T>(this, fn);
}

IterableX.prototype.catchWith = catchWithProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    catchWith: typeof catchWithProto;
  }
}
