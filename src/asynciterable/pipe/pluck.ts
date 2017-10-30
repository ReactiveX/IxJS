import { OperatorAsyncFunction } from '../../interfaces';
import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { pluck as pluckStatic } from '../pluck';

export function pluck<TSource, TResult>(
  ...args: string[]
): OperatorAsyncFunction<TSource, TResult> {
  return function pluckOperatorFunction(source: AsyncIterable<TSource>): AsyncIterableX<TResult> {
    return pluckStatic(source, ...args);
  };
}
