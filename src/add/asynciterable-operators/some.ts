import { AsyncIterableX } from '../../asynciterable';
import { some } from '../../asynciterable/some';

/**
 * @ignore
 */
export function someProto<T>(
    this: AsyncIterableX<T>,
    comparer: (value: T, index: number) => boolean | Promise<boolean>): Promise<boolean> {
  return some(this, comparer);
}

AsyncIterableX.prototype.some = someProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    some: typeof someProto;
  }
}