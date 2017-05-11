import { AsyncIterableX } from '../../asynciterable';
import { last } from '../../asynciterable/last';

export function lastProto<T>(
    this: AsyncIterableX<T>,
    fn: (value: T) => boolean = () => true): Promise<T | undefined> {
  return last(this, fn);
}

AsyncIterableX.prototype.last = lastProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    last: typeof lastProto;
  }
}