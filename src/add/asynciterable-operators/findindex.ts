import { AsyncIterableX } from '../../asynciterable/asynciterablex.js';
import { findIndex } from '../../asynciterable/findindex.js';
import { FindOptions } from '../../asynciterable/findoptions.js';

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
