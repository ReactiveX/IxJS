import { OperatorFunction } from '../../interfaces';
import { IterableX } from '../../iterable';
import { pluck as pluckStatic } from '../pluck';

export function pluck<TSource, TResult>(...args: string[]): OperatorFunction<TSource, TResult> {
  return function pluckOperatorFunction(source: Iterable<TSource>): IterableX<TResult> {
    return pluckStatic(source, ...args);
  };
}
