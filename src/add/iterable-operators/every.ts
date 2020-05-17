import { IterableX } from '../../iterable/iterablex';
import { every } from '../../iterable/every';
import { FindOptions } from '../../iterable/findoptions';

/**
 * @ignore
 */
export function everyProto<T>(this: IterableX<T>, options: FindOptions<T>): boolean {
  return every(this, options as any);
}

IterableX.prototype.every = everyProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    every: typeof everyProto;
  }
}
