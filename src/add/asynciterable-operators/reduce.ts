import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { reduce } from '../../asynciterable/reduce';
import { ReduceOptions } from '../../asynciterable/reduceoptions';

/**
 * @ignore
 */
export async function reduceProto<T, R = T>(
  this: AsyncIterableX<T>,
  options: ReduceOptions<T, R>
): Promise<R> {
  return reduce(this, options);
}

AsyncIterableX.prototype.reduce = reduceProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    reduce: typeof reduceProto;
  }
}
