import { IterableX } from '../../iterable';
import { expand } from '../../iterable/expand';

export function expandProto<TSource>(
    this: IterableX<TSource>,
    fn: (value: TSource) => Iterable<TSource>) {
  return new IterableX(expand(this, fn));
}

IterableX.prototype.expand = expandProto;

declare module '../../iterable' {
  interface IterableX<T> {
    expand: typeof expandProto;
  }
}