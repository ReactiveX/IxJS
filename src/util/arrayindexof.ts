import { AbortError } from './aborterror';

/**
 * @ignore
 */
export function arrayIndexOf<T>(array: T[], item: T, comparer: (a: T, b: T) => boolean) {
  for (let i = 0, len = array.length; i < len; i++) {
    if (comparer(item, array[i])) {
      return i;
    }
  }
  return -1;
}

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
    if (signal?.aborted) {
      throw new AbortError();
    }
    if (eq) {
      return i;
    }
  }
  return -1;
}
