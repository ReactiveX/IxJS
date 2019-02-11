import { AsyncIterableX } from './asynciterablex';
export function of<TSource>(...args: TSource[]): AsyncIterableX<TSource> {
  return AsyncIterableX.of(...args);
}
