import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { min } from '../../asynciterable/min';
import { ExtremaOptions } from '../../asynciterable/extremaoptions';

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
