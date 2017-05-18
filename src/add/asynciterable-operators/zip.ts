import { AsyncIterableX } from '../../asynciterable';
import { zip } from '../../asynciterable/zip';

export function zipProto<T, TResult>(
    this: AsyncIterableX<T>,
    second: AsyncIterable<T>,
    fn: (fst: T, snd: T) => TResult): AsyncIterableX<TResult> {
  return zip(this, second, fn);
}

AsyncIterableX.prototype.zip = zipProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    zip: typeof zipProto;
  }
}