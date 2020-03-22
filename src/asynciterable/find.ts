import { AbortSignal } from '../abortsignal';
import { wrapWithAbort } from './operators/withabort';

export async function find<T, S extends T>(
  source: AsyncIterable<T>,
  predicate: (value: T, index: number, signal?: AbortSignal) => value is S,
  thisArg?: any,
  signal?: AbortSignal
): Promise<S | undefined>;
export async function find<T>(
  source: AsyncIterable<T>,
  predicate: (value: T, index: number, signal?: AbortSignal) => boolean | Promise<boolean>,
  thisArg?: any,
  signal?: AbortSignal
): Promise<T | undefined>;
export async function find<T>(
  source: AsyncIterable<T>,
  predicate: (value: T, index: number, signal?: AbortSignal) => boolean | Promise<boolean>,
  thisArg?: any,
  signal?: AbortSignal
): Promise<T | undefined> {
  let i = 0;

  for await (const item of wrapWithAbort(source, signal)) {
    if (await predicate.call(thisArg, item, i++, signal)) {
      return item;
    }
  }
  return undefined;
}
