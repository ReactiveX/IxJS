import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { count } from '../../asynciterable/count';
import { OptionalFindOptions } from '../../asynciterable/findoptions';

/**
 * @ignore
 */
export function countProto<T>(
  this: AsyncIterable<T>,
  options?: OptionalFindOptions<T>
): Promise<number> {
  return count<T>(this, options);
}

AsyncIterableX.prototype.count = countProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    count: typeof countProto;
  }
}
