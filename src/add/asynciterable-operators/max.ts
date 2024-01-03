import { AsyncIterableX } from '../../asynciterable/asynciterablex.js';
import { max } from '../../asynciterable/max.js';
import { ExtremaOptions } from '../../asynciterable/extremaoptions.js';

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
