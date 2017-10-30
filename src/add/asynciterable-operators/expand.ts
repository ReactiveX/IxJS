import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { expand } from '../../asynciterable/expand';

/**
 * @ignore
 */
export function expandProto<TSource>(
  this: AsyncIterableX<TSource>,
  selector: (value: TSource) => AsyncIterable<TSource> | Promise<AsyncIterable<TSource>>
) {
  return expand(this, selector);
}

AsyncIterableX.prototype.expand = expandProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    expand: typeof expandProto;
  }
}
