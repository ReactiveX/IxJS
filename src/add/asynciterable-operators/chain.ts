import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { chain as chainStatic } from '../../asynciterable/chain';

/**
 * @ignore
 */
export function chainProto<TSource, TResult>(
  this: AsyncIterableX<TSource>,
  selector: (source: AsyncIterable<TSource>) => AsyncIterable<TResult>
): AsyncIterableX<TResult> {
  return chainStatic<TSource, TResult>(this, selector);
}

AsyncIterableX.prototype.chain = chainProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    chain: typeof chainProto;
  }
}
