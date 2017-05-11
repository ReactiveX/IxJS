import { AsyncIterableX } from '../../asynciterable';
import { single } from '../../asynciterable/single';

export function singleProto<T>(
    this: AsyncIterableX<T>,
    fn: (value: T) => boolean = () => true): Promise<T | undefined> {
  return single(this, fn);
}

AsyncIterableX.prototype.single = singleProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    single: typeof singleProto;
  }
}