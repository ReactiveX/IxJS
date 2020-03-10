import { wrapWithAbort } from './operators/withabort';

export async function first<T, S extends T>(
  source: AsyncIterable<T>,
  predicate: (value: T, index: number, signal?: AbortSignal) => value is S,
  signal?: AbortSignal
): Promise<S | undefined>;
export async function first<T>(
  source: AsyncIterable<T>,
  predicate?: (value: T, index: number, signal?: AbortSignal) => boolean | Promise<boolean>,
  signal?: AbortSignal
): Promise<T | undefined>;
export async function first<T>(
  source: AsyncIterable<T>,
  predicate: (value: T, index: number, signal?: AbortSignal) => boolean | Promise<boolean> = async () => true,
  signal?: AbortSignal
): Promise<T | undefined> {
  let i = 0;
  for await (const item of wrapWithAbort(source, signal)) {
    if (await predicate(item, i++, signal)) {
      return item;
    }
  }

  return undefined;
}
