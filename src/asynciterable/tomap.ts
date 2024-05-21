import { identityAsync } from '../util/identity.js';
import { wrapWithAbort } from './operators/withabort.js';
import { throwIfAborted } from '../aborterror.js';

/**
 * The options for the toMap method which include an optional element selector and abort signal for cancellation.
 *
 * @interface ToMapOptions
 * @template TSource
 * @template TElement
 * @ignore
 */
export interface ToMapOptions<TSource, TKey, TElement> {
  /**
   * The selector to get the key for the map.
   *
   * @memberof ToMapOptions
   */
  keySelector: (item: TSource, signal?: AbortSignal) => TKey | Promise<TKey>;
  /**
   * The selector used to get the element for the Map.
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

/**
 * Converts an async-iterable to a map with a key selector and options for an element selector and cancellation.
 *
 * @template TSource The type of elements in the source collection.
 * @template TKey The type of key used for the map.
 * @template TElement The type of element to use for the map.
 * @param {AsyncIterable<TSource>} source The source collection to turn into a map.
 * @param {ToMapOptions<TSource, TElement>} [options]
 * @returns {(Promise<Map<TKey, TElement | TSource>>)}
 */
export async function toMap<TSource, TKey, TElement = TSource>(
  source: AsyncIterable<TSource>,
  options: ToMapOptions<TSource, TKey, TElement>
): Promise<Map<TKey, TElement | TSource>> {
  const {
    ['signal']: signal,
    ['elementSelector']: elementSelector = identityAsync as any,
    ['keySelector']: keySelector = identityAsync as any,
  } = options || {};
  throwIfAborted(signal);
  const map = new Map<TKey, TElement | TSource>();
  for await (const item of wrapWithAbort(source, signal)) {
    const value = await elementSelector!(item, signal);
    const key = await keySelector(item, signal);
    map.set(key, value);
  }
  return map;
}
