import { wrapWithAbort } from './operators/withabort';
import { throwIfAborted } from '../aborterror';

export async function single<T, S extends T>(
  source: AsyncIterable<T>,
  predicate: (value: T, index: number, signal?: AbortSignal) => value is S,
  thisArg?: any,
  signal?: AbortSignal
): Promise<S | undefined>;
export async function single<T>(
  source: AsyncIterable<T>,
  predicate?: (value: T, index: number, signal?: AbortSignal) => boolean | Promise<boolean>,
  thisArg?: any,
  signal?: AbortSignal
): Promise<T | undefined>;
export async function single<T>(
  source: AsyncIterable<T>,
  predicate: (value: T, index: number, signal?: AbortSignal) => boolean | Promise<boolean> = () =>
    true,
  thisArg?: any,
  signal?: AbortSignal
): Promise<T | undefined> {
  throwIfAborted(signal);
  let result: T | undefined;
  let hasResult = false;
  let i = 0;
  for await (const item of wrapWithAbort(source, signal)) {
    if (hasResult && (await predicate.call(thisArg, item, i++, signal))) {
      throw new Error('More than one element was found');
    }
    if (await predicate.call(thisArg, item, i++, signal)) {
      result = item;
      hasResult = true;
    }
  }

  return result;
}
