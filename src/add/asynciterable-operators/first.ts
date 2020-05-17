import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { first } from '../../asynciterable/first';
import { OptionalFindOptions } from '../../asynciterable/findoptions';

/**
 * @ignore
 */
export async function firstProto<T>(
  this: AsyncIterable<T>,
  options?: OptionalFindOptions<T>
): Promise<T | undefined> {
  return first(this, options as any);
}

AsyncIterableX.prototype.first = firstProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    first: typeof firstProto;
  }
}
