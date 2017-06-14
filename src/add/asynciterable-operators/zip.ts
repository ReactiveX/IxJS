import { AsyncIterableX } from '../../asynciterable';
import { zip } from '../../asynciterable/zip';

/**
 * @ignore
 */
export function zipProto<T, TResult>(
    this: AsyncIterableX<T>,
    second: AsyncIterable<T>,
    selector: (fst: T, snd: T) => TResult | Promise<TResult>): AsyncIterableX<TResult> {
  return zip(this, second, selector);
}

AsyncIterableX.prototype.zip = zipProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    zip: typeof zipProto;
  }
}