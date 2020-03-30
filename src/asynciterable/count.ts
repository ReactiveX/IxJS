import { wrapWithAbort } from './operators/withabort';

/**
 * Returns a promise that represents how many elements in the specified async-iterable sequence satisfy a condition.
 * @param source An async-enumerable sequence that contains elements to be counted.
 * @param fn A function to test each element for a condition.
 * @param signal The optional abort signal to be used for cancelling the sequence at any time.
 */
export async function count<T>(
  source: AsyncIterable<T>,
  fn: (value: T, signal?: AbortSignal) => boolean | Promise<boolean> = async () => true,
  signal?: AbortSignal
): Promise<number> {
  let i = 0;

  for await (const item of wrapWithAbort(source, signal)) {
    if (await fn(item, signal)) {
      i++;
    }
  }

  return i;
}
