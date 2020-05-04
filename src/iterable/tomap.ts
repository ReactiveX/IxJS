import { identity } from '../util/identity';

/**
 * The options for the toMap method which include an optional element selector and abort signal for cancellation.
 *
 * @interface ToMapOptions
 * @template TSource
 * @template TElement
 */
export interface ToMapOptions<TSource, TElement> {
  /**
   * The selector used to get the element for the Map.
   *
   * @memberof ToMapOptions
   */
  elementSelector?: (item: TSource) => TElement;
}

/**
 * Converts an async-iterable to a map with a key selector and options for an element selector and cancellation.
 *
 * @export
 * @template TSource The type of elements in the source collection.
 * @template TKey The type of key used for the map.
 * @template TElement The type of element to use for the map.
 * @param {AsyncIterable<TSource>} source The source collection to turn into a map.
 * @param {((item: TSource) => TKey)} keySelector
 * @param {ToMapOptions<TSource, TElement>} [options]
 * @returns {(Map<TKey, TElement | TSource>)}
 */
export function toMap<TSource, TKey, TElement = TSource>(
  source: Iterable<TSource>,
  keySelector: (item: TSource) => TKey,
  options?: ToMapOptions<TSource, TElement>
): Map<TKey, TElement | TSource> {
  const opts = options || ({} as ToMapOptions<TSource, TElement>);
  if (!opts.elementSelector) {
    opts.elementSelector = identity;
  }
  const { ['elementSelector']: elementSelector } = opts;
  const map = new Map<TKey, TElement | TSource>();
  for (const item of source) {
    const value = elementSelector!(item);
    const key = keySelector(item);
    map.set(key, value);
  }
  return map;
}
