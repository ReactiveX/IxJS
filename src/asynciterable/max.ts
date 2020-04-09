import { identityAsync } from '../util/identity';
import { wrapWithAbort } from './operators/withabort';
import { throwIfAborted } from '../aborterror';
import { MathOptions } from './mathoptions';

/**
 * Returns the maximum element with the optional selector.
 *
 * @export
 * @param {AsyncIterable<number>} source An async-iterable sequence to determine the maximum element of.
 * @param {MathOptions<number>} [options] Optional options which include a selector for projecting,
 * a thisArg for binding to the selector, and an abort signal for cancellation.
 * @returns {Promise<number>} A promise containing the maximum element.
 */
export async function max(
  source: AsyncIterable<number>,
  options?: MathOptions<number>
): Promise<number>;
/**
 * Returns the maximum element with the optional selector.
 *
 * @export
 * @template T The type of the elements in the source sequence.
 * @param {AsyncIterable<T>} source An async-iterable sequence to determine the maximum element of.
 * @param {MathOptions<number>} [options] Optional options which include a selector for projecting,
 * a thisArg for binding to the selector, and an abort signal for cancellation.
 * @returns {Promise<number>} A promise containing the maximum element.
 */
export async function max<T>(source: AsyncIterable<T>, options?: MathOptions<T>): Promise<number>;
/**
 * Returns the maximum element with the optional selector.
 *
 * @export
 * @param {AsyncIterable<any>} source An async-iterable sequence to determine the maximum element of.
 * @param {MathOptions<number>} [options] Optional options which include a selector for projecting,
 * a thisArg for binding to the selector, and an abort signal for cancellation.
 * @returns {Promise<number>} A promise containing the maximum element.
 */
export async function max(source: AsyncIterable<any>, options?: MathOptions<any>): Promise<number> {
  const opts = options || ({ ['selector']: identityAsync } as MathOptions<any>);
  const { ['selector']: selector, ['signal']: signal, ['thisArg']: thisArg } = opts;
  throwIfAborted(signal);
  let atleastOnce = false;
  let value = -Infinity;
  for await (const item of wrapWithAbort(source, signal)) {
    if (!atleastOnce) {
      atleastOnce = true;
    }
    const x = await selector!.call(thisArg, item, signal);
    if (x > value) {
      value = x;
    }
  }
  if (!atleastOnce) {
    throw new Error('Sequence contains no elements');
  }

  return value;
}
