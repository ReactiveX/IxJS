import { IterableX } from '../iterablex';
import { MapIterable } from './map';
import { OperatorFunction } from '../../interfaces';

function plucker(props: string[], length: number): (x: any) => any {
  const mapper = (x: any) => {
    let currentProp = x;
    for (let i = 0; i < length; i++) {
      const p = currentProp[props[i]];
      if (typeof p !== 'undefined') {
        currentProp = p;
      } else {
        return undefined;
      }
    }
    return currentProp;
  };

  return mapper;
}

export function pluck<TSource, TResult>(...args: string[]): OperatorFunction<TSource, TResult> {
  return function pluckOperatorFunction(source: Iterable<TSource>): IterableX<TResult> {
    return new MapIterable<TSource, TResult>(source, (plucker(args, args.length) as any) as (
      value: TSource
    ) => TResult);
  };
}
