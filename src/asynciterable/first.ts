import { wrapWithAbort } from './operators/withabort';
import { throwIfAborted } from '../aborterror';
import { OptionalFindOptions } from './findoptions';

/**
 * Returns the first element of an async-iterable sequence that matches the predicate if provided, or undefined if no such element exists.
 *
 * @export
 * @template T The type of the elements in the source sequence.
 * @param {AsyncIterable<T>} source Source async-enumerable sequence.
 * @returns {(Promise<S | undefined>)} A Promise containing the first element in the async-iterable sequence,
 * or a default value if no such element exists.
 */
export async function first<T>(
  source: AsyncIterable<T>,
  options?: OptionalFindOptions<T>
): Promise<T | undefined> {
  const opts = options || ({} as OptionalFindOptions<T>);
  if (!opts.predicate) {
    opts.predicate = async () => true;
  }
  const { ['signal']: signal, ['thisArg']: thisArg, ['predicate']: predicate } = opts;
  throwIfAborted(signal);
  let i = 0;
  for await (const item of wrapWithAbort(source, signal)) {
    if (await predicate!.call(thisArg, item, i++, signal)) {
      return item;
    }
  }

  return undefined;
}
