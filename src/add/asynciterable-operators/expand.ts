import { AsyncIterableX } from '../../asynciterable';
import { expand } from '../../asynciterable/expand';

export function expandProto<TSource>(
  this: AsyncIterableX<TSource>,
  fn: (value: TSource) => AsyncIterable<TSource>) {
  return expand(this, fn);
}

AsyncIterableX.prototype.expand = expandProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    expand: typeof expandProto;
  }
}