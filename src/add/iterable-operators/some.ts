import { IterableX } from '../../iterable/iterablex.js';
import { some } from '../../iterable/some.js';
import { FindOptions } from '../../iterable/findoptions.js';

/**
 * @ignore
 */
export function someProto<T>(this: IterableX<T>, options: FindOptions<T>): boolean {
  return some(this, options as any);
}

IterableX.prototype.some = someProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    some: typeof someProto;
  }
}
