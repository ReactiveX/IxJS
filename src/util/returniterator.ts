/**
 * @ignore
 */
export function returnIterator<T>(it: Iterator<T>) {
  if (typeof it?.return === 'function') {
    it.return();
  }
}

/**
 * @ignore
 */
export async function returnAsyncIterators(iterators: AsyncIterator<unknown>[]): Promise<void> {
  for (const iterator of iterators) {
    // Calling return on a generator that is currently executing should throw a TypeError, so we can't
    // just await the return call of any iterator. To be fully correct, we should instead abort instead
    // of returning in most situations, but for now, this will do.
    // TODO: Send a signal to the pending `next()` Promises to stop
    void iterator.return?.();
  }
}
