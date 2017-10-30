import { IterableX } from '../../iterable/iterablex';
import { expand } from '../../iterable/expand';

/**
 * @ignore
 */
export function expandProto<TSource>(
  this: IterableX<TSource>,
  fn: (value: TSource) => Iterable<TSource>
) {
  return expand(this, fn);
}

IterableX.prototype.expand = expandProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    expand: typeof expandProto;
  }
}
