import { AsyncIterableX } from './asynciterablex';
import { map } from './map';
import { OperatorAsyncFunction } from '../interfaces';

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

export function pluck<TSource, TResult>(
  ...args: string[]
): OperatorAsyncFunction<TSource, TResult> {
  return function pluckOperatorFunction(source: AsyncIterable<TSource>): AsyncIterableX<TResult> {
    return (map<TSource, TResult>((plucker(args, args.length) as any) as (
      value: TSource
    ) => TResult))(source);
  };
}
