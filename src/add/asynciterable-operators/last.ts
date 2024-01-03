import { AsyncIterableX } from '../../asynciterable/asynciterablex.js';
import { last } from '../../asynciterable/last.js';
import { OptionalFindOptions } from '../../asynciterable/findoptions.js';

/**
 * @ignore
 */
export async function lastProto<T>(
  this: AsyncIterable<T>,
  options?: OptionalFindOptions<T>
): Promise<T | undefined> {
  return last(this, options as any);
}

AsyncIterableX.prototype.last = lastProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    last: typeof lastProto;
  }
}
