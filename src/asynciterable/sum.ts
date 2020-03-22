import { AbortSignal } from '../abortsignal';
import { identityAsync } from '../util/identity';
import { wrapWithAbort } from './operators/withabort';

export async function sum(
  source: AsyncIterable<number>,
  selector?: (x: number, signal?: AbortSignal) => number | Promise<number>,
  signal?: AbortSignal
): Promise<number>;
export async function sum<T>(
  source: AsyncIterable<T>,
  selector: (x: T, signal?: AbortSignal) => number | Promise<number>,
  signal?: AbortSignal
): Promise<number>;
export async function sum(
  source: AsyncIterable<any>,
  selector: (x: any, signal?: AbortSignal) => number | Promise<number> = identityAsync,
  signal?: AbortSignal
): Promise<number> {
  let value = 0;
  for await (const item of wrapWithAbort(source, signal)) {
    value += await selector(item, signal);
  }

  return value;
}
