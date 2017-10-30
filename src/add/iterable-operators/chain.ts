import { IterableX } from '../../iterable/iterablex';
import { chain as chainStatic } from '../../iterable/chain';

/**
 * @ignore
 */
export function chainProto<TSource, TResult>(
  this: IterableX<TSource>,
  selector: (source: Iterable<TSource>) => Iterable<TResult>
): IterableX<TResult> {
  return chainStatic<TSource, TResult>(this, selector);
}

IterableX.prototype.chain = chainProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    chain: typeof chainProto;
  }
}
