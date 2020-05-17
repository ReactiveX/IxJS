import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { max } from '../../asynciterable/max';
import { ExtremaOptions } from '../../asynciterable/extremaoptions';

export async function maxProto<TSource, TResult = TSource>(
  this: AsyncIterable<TSource>,
  options?: ExtremaOptions<TSource, TResult>
): Promise<TResult> {
  return max(this, options);
}

AsyncIterableX.prototype.max = maxProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    max: typeof maxProto;
  }
}
