import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { findIndex } from '../../asynciterable/findindex';
import { FindOptions } from '../../asynciterable/findoptions';

/**
 * @ignore
 */
export function findIndexProto<T>(
  this: AsyncIterable<T>,
  options: FindOptions<T>
): Promise<number> {
  return findIndex(this, options);
}

AsyncIterableX.prototype.findIndex = findIndexProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    findIndex: typeof findIndexProto;
  }
}
