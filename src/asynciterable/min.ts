import { identityAsync } from '../util/identity';
import { wrapWithAbort } from './operators/withabort';
import { throwIfAborted } from '../aborterror';

export async function min(
  source: AsyncIterable<number>,
  selector?: (x: number, signal?: AbortSignal) => number | Promise<number>,
  signal?: AbortSignal
): Promise<number>;
export async function min<T>(
  source: AsyncIterable<T>,
  selector: (x: T, signal?: AbortSignal) => number | Promise<number>,
  signal?: AbortSignal
): Promise<number>;
export async function min(
  source: AsyncIterable<any>,
  selector: (x: any, signal?: AbortSignal) => number | Promise<number> = identityAsync,
  signal?: AbortSignal
): Promise<number> {
  throwIfAborted(signal);
  let atleastOnce = false;
  let value = Infinity;
  for await (const item of wrapWithAbort(source, signal)) {
    if (!atleastOnce) {
      atleastOnce = true;
    }
    const x = await selector(item, signal);
    if (x < value) {
      value = x;
    }
  }
  if (!atleastOnce) {
    throw new Error('Sequence contains no elements');
  }

  return value;
}
