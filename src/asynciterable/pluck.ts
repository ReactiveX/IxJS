import { AsyncIterableX } from '../asynciterable';
import { map } from './map';

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
  source: AsyncIterable<TSource>,
  ...args: string[]): AsyncIterableX<TResult> {
  return map<TSource, TResult>(source, plucker(args, args.length) as any as (value: TSource) => TResult);
}
