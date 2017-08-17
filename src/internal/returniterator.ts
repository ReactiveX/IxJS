/**
 * @ignore
 */
export function returnIterator<T>(it: Iterator<T>) {
  if (typeof it.return === 'function') {
    it.return();
  }
}

/**
 * @ignore
 */
export async function returnAsyncIterator<T>(it: AsyncIterator<T>): Promise<void> {
  if (typeof it.return === 'function') {
    await it.return();
  }
}