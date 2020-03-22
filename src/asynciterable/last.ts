import { AbortSignal } from '../abortsignal';
import { wrapWithAbort } from './operators/withabort';

export async function last<T, S extends T>(
  source: AsyncIterable<T>,
  predicate: (value: T, index: number, signal?: AbortSignal) => value is S,
  thisArg?: any,
  signal?: AbortSignal
): Promise<S | undefined>;
export async function last<T>(
  source: AsyncIterable<T>,
  predicate?: (value: T, index: number, signal?: AbortSignal) => boolean | Promise<boolean>,
  thisArg?: any,
  signal?: AbortSignal
): Promise<T | undefined>;
export async function last<T>(
  source: AsyncIterable<T>,
  predicate: (
    value: T,
    index: number,
    signal?: AbortSignal
  ) => boolean | Promise<boolean> = async () => true,
  thisArg?: any,
  signal?: AbortSignal
): Promise<T | undefined> {
  let i = 0;
  let result: T | undefined;
  for await (const item of wrapWithAbort(source, signal)) {
    if (await predicate.call(thisArg, item, i++, signal)) {
      result = item;
    }
  }

  return result;
}
