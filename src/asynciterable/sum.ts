import { identityAsync } from '../util/identity';
import { wrapWithAbort } from './operators/withabort';
import { throwIfAborted } from '../aborterror';
import { MathOptions } from './mathoptions';

export async function sum(
  source: AsyncIterable<number>,
  options: MathOptions<number>
): Promise<number>;
export async function sum<T>(source: AsyncIterable<T>, options: MathOptions<T>): Promise<number>;
export async function sum(source: AsyncIterable<any>, options: MathOptions<any>): Promise<number> {
  const opts = options || ({ ['selector']: identityAsync } as MathOptions<any>);
  const { ['selector']: selector, ['signal']: signal, ['thisArg']: thisArg } = opts;
  throwIfAborted(signal);
  let value = 0;
  for await (const item of wrapWithAbort(source, signal)) {
    value += await selector!.call(thisArg, item, signal);
  }

  return value;
}
