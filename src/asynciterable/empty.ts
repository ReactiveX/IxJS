import { AsyncIterableX } from '../asynciterable';

class EmptyAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  async *[Symbol.asyncIterator](): AsyncIterator<TSource> {
    // tslint:disable-next-line:no-empty
  }
}

export function empty<TSource>(): AsyncIterableX<TSource> {
  return new EmptyAsyncIterable<TSource>();
}
