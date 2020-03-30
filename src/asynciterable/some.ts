import { wrapWithAbort } from './operators/withabort';
import { throwIfAborted } from '../aborterror';

export async function some<T, S extends T>(
  source: AsyncIterable<T>,
  predicate: (value: T, index: number, signal?: AbortSignal) => value is S,
  thisArg?: any,
  signal?: AbortSignal
): Promise<boolean>;
export async function some<T>(
  source: AsyncIterable<T>,
  predicate: (value: T, index: number, signal?: AbortSignal) => boolean | Promise<boolean>,
  thisArg?: any,
  signal?: AbortSignal
): Promise<boolean>;
export async function some<T>(
  source: AsyncIterable<T>,
  predicate: (value: T, index: number, signal?: AbortSignal) => boolean | Promise<boolean>,
  thisArg?: any,
  signal?: AbortSignal
): Promise<boolean> {
  throwIfAborted(signal);
  let i = 0;
  for await (const item of wrapWithAbort(source, signal)) {
    if (await predicate.call(thisArg, item, i++, signal)) {
      return true;
    }
  }
  return false;
}
