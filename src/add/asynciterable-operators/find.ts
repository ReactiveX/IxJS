import { AsyncIterableX } from '../../asynciterable/asynciterablex.js';
import { find } from '../../asynciterable/find.js';
import { FindOptions } from '../../asynciterable/findoptions.js';

/**
 * @ignore
 */
export async function findProto<T>(
  this: AsyncIterable<T>,
  options: FindOptions<T>
): Promise<T | undefined> {
  return find(this, options as any);
}

AsyncIterableX.prototype.find = findProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    find: typeof findProto;
  }
}
