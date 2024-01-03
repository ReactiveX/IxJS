import { AsyncIterableX } from '../../asynciterable/asynciterablex.js';
import { min } from '../../asynciterable/min.js';
import { ExtremaOptions } from '../../asynciterable/extremaoptions.js';

export function minProto<TSource, TResult = TSource>(
  this: AsyncIterable<TSource>,
  options?: ExtremaOptions<TSource, TResult>
): Promise<TResult> {
  return min(this, options);
}

AsyncIterableX.prototype.min = minProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    min: typeof minProto;
  }
}
