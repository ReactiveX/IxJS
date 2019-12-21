import { AsyncIterableX } from './asynciterablex';
import { defer } from './defer';
import { empty } from './empty';

export function iif<TSource>(
  fn: () => boolean | Promise<boolean>,
  thenSource: AsyncIterable<TSource>,
  elseSource: AsyncIterable<TSource> = empty<TSource>()
): AsyncIterableX<TSource> {
  return defer<TSource>(async () => ((await fn()) ? thenSource : elseSource));
}
