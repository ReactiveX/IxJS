import { identityAsync } from '../util/identity';
import { wrapWithAbort } from './operators/withabort';
import { throwIfAborted } from '../aborterror';

/**
 * Converts the given async-iterable to a Map.
 * @param source The async-iterable to convert to a Map.
 * @param keySelector The selector used to get the key for the Map.
 */
export async function toMap<TSource, TKey>(
  source: AsyncIterable<TSource>,
  keySelector: (item: TSource) => TKey | Promise<TKey>
): Promise<Map<TKey, TSource>>;
/**
 * Converts the given async-iterable to a Map.
 * @param source The async-iterable to convert to a Map.
 * @param keySelector The selector used to get the key for the Map.
 * @param elementSelector The selector used to get the element for the Map.
 */
export async function toMap<TSource, TKey, TElement = TSource>(
  source: AsyncIterable<TSource>,
  keySelector: (item: TSource) => TKey | Promise<TKey>,
  elementSelector?: (item: TSource) => TElement | Promise<TElement>
): Promise<Map<TKey, TElement>>;
/**
 * Converts the given async-iterable to a Map.
 * @param source The async-iterable to convert to a Map.
 * @param keySelector The selector used to get the key for the Map.
 * @param elementSelector The selector used to get the element for the Map.
 * @param signal An optional abort signal to cancel the operation at any time.
 */
export async function toMap<TSource, TKey, TElement = TSource>(
  source: AsyncIterable<TSource>,
  keySelector: (item: TSource) => TKey | Promise<TKey>,
  elementSelector: (item: TSource) => TElement | Promise<TElement> = identityAsync,
  signal?: AbortSignal
): Promise<Map<TKey, TElement | TSource>> {
  throwIfAborted(signal);
  const map = new Map<TKey, TElement | TSource>();
  for await (const item of wrapWithAbort(source, signal)) {
    const value = await elementSelector(item);
    const key = await keySelector(item);
    map.set(key, value);
  }
  return map;
}
