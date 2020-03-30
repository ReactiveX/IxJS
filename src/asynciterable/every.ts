import { wrapWithAbort } from './operators/withabort';
import { throwIfAborted } from '../aborterror';

export async function every<T, S extends T>(
  source: AsyncIterable<T>,
  predicate: (value: T, index: number, signal?: AbortSignal) => value is S,
  thisArg?: any,
  signal?: AbortSignal
): Promise<boolean>;
export async function every<T>(
  source: AsyncIterable<T>,
  predicate: (value: T, index: number, signal?: AbortSignal) => boolean | Promise<boolean>,
  thisArg?: any,
  signal?: AbortSignal
): Promise<boolean>;
export async function every<T>(
  source: AsyncIterable<T>,
  predicate: (value: T, index: number, signal?: AbortSignal) => boolean | Promise<boolean>,
  thisArg?: any,
  signal?: AbortSignal
): Promise<boolean> {
  throwIfAborted(signal);
  let i = 0;
  for await (const item of wrapWithAbort(source, signal)) {
    if (!(await predicate.call(thisArg, item, i++, signal))) {
      return false;
    }
  }
  return true;
}
