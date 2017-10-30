import { IterableX } from '../../iterable/iterablex';
import { skip } from '../../iterable/skip';

/**
 * @ignore
 */
export function skipProto<T>(this: IterableX<T>, count: number): IterableX<T> {
  return skip(this, count);
}

IterableX.prototype.skip = skipProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    skip: typeof skipProto;
  }
}
