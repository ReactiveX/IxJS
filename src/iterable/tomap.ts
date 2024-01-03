import { identity } from '../util/identity.js';

/**
 * The options for the toMap method which include an optional element selector and abort signal for cancellation.
 *
 * @interface ToMapOptions
 * @template TSource
 * @template TElement
 * @ignore
 */
export interface ToMapOptions<TSource, TElement> {
  /**
   * The selector to get the key for the map.
   *
   * @memberof ToMapOptions
   */
  keySelector: (item: TSource) => TElement;
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
 * @template TSource The type of elements in the source collection.
 * @template TKey The type of key used for the map.
 * @template TElement The type of element to use for the map.
 * @param {AsyncIterable<TSource>} source The source collection to turn into a map.
 * @param {ToMapOptions<TSource, TElement>} options The options for getting the key and element for the map.
 * @returns {(Map<TKey, TElement | TSource>)} A map containing the key and elements from the selector functions.
 */
export function toMap<TSource, TKey, TElement = TSource>(
  source: Iterable<TSource>,
  options: ToMapOptions<TSource, TElement>
): Map<TKey, TElement | TSource> {
  const {
    ['elementSelector']: elementSelector = identity as any,
    ['keySelector']: keySelector = identity as any,
  } = options || {};
  const map = new Map<TKey, TElement | TSource>();
  for (const item of source) {
    const value = elementSelector!(item);
    const key = keySelector(item);
    map.set(key, value);
  }
  return map;
}
