import { IterableX } from '../../iterable/iterablex';
import { reduce } from '../../iterable/reduce';
import { ReduceOptions } from '../../iterable/reduceoptions';

/**
 * @ignore
 */
export function reduceProto<T, R = T>(this: IterableX<T>, options: ReduceOptions<T, R>): R {
  return reduce(this, options);
}

IterableX.prototype.reduce = reduceProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    reduce: typeof reduceProto;
  }
}
