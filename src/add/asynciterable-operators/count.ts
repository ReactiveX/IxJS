import { AsyncIterableX } from '../../asynciterable';
import { count } from '../../asynciterable/count';

/**
 * @ignore
 */
export function countProto<T>(
    this: AsyncIterableX<T>,
    selector?: (value: T) => boolean | Promise<boolean>): Promise<number> {
  return count<T>(this, selector);
}

AsyncIterableX.prototype.count = countProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    count: typeof countProto;
  }
}