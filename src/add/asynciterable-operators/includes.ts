import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { includes } from '../../asynciterable/includes';

/**
 * @ignore
 */
export function includesProto<T>(
  this: AsyncIterableX<T>,
  searchElement: T,
  fromIndex: number
): Promise<boolean> {
  return includes(this, searchElement, fromIndex);
}

AsyncIterableX.prototype.includes = includesProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    includes: typeof includesProto;
  }
}
