import { identityAsync } from '../util/identity';
import { wrapWithAbort } from './operators/withabort';
import { throwIfAborted } from '../aborterror';

/**
 * The options for the toMap method which include an optional element selector and abort signal for cancellation.
 *
 * @interface ToMapOptions
 * @template TSource
 * @template TElement
 */
export interface ToMapOptions<TSource, TElement> {
  /**
   * The selector used to get the key for the Map.
   *
   * @memberof ToMapOptions
   */
  elementSelector?: (item: TSource, signal?: AbortSignal) => TElement | Promise<TElement>;
  /**
   * An optional abort signal to cancel the operation at any time.
   *
   * @type {AbortSignal}
   * @memberof ToMapOptions
   */
  signal?: AbortSignal;
}

export async function toMap<TSource, TKey, TElement = TSource>(
  source: AsyncIterable<TSource>,
  keySelector: (item: TSource, signal?: AbortSignal) => TKey | Promise<TKey>,
  options?: ToMapOptions<TSource, TElement>
): Promise<Map<TKey, TElement | TSource>> {
  const opts = options || ({ keySelector: identityAsync } as ToMapOptions<TSource, TElement>);
  const { ['signal']: signal, ['elementSelector']: elementSelector } = opts;
  throwIfAborted(signal);
  const map = new Map<TKey, TElement | TSource>();
  for await (const item of wrapWithAbort(source, signal)) {
    const value = await elementSelector!(item, signal);
    const key = await keySelector(item, signal);
    map.set(key, value);
  }
  return map;
}
