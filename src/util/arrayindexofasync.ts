import { throwIfAborted } from './aborterror';

/**
 * @ignore
 */
export async function arrayIndexOfAsync<T>(
  array: T[],
  item: T,
  comparer: (a: T, b: T) => boolean | Promise<boolean>,
  signal?: AbortSignal
): Promise<number> {
  for (let i = 0, len = array.length; i < len; i++) {
    const eq = await comparer(item, array[i]);
    throwIfAborted(signal);
    if (eq) {
      return i;
    }
  }
  return -1;
}
