import { AsyncIterableX } from '../../asynciterable';
import { count } from '../../asynciterable/count';

export function countProto<T>(
    this: AsyncIterableX<T>,
    fn?: (value: T) => boolean): Promise<number> {
  return count<T>(this, fn);
}

AsyncIterableX.prototype.count = countProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    count: typeof countProto;
  }
}