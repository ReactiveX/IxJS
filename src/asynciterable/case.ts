import { AsyncIterableX } from '../asynciterable';
import { defer } from './defer';
import { empty } from './empty';

export function _case<TSource, TResult>(
    selector: () => TSource | Promise<TSource>,
    sources: Map<TSource, AsyncIterable<TResult>>,
    defaultSource: AsyncIterable<TResult> = empty<TResult>()): AsyncIterableX<TResult> {
  return defer<TResult>(async () => {
    const key = await selector();
    return sources.has(key) ? sources.get(key)! : defaultSource;
  });
}
