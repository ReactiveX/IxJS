import { wrapWithAbort } from './operators/withabort';
import { throwIfAborted } from '../aborterror';
import { OptionalFindSubclassedOptions, OptionalFindOptions } from './findoptions';

/**
 * Returns the only element of an async-iterable sequence that matches the predicate if specified,
 * or undefined if no such element exists; this method reports an exception if there is more
 * than one element in the async-iterable sequence.
 *
 * @export
 * @template T The type of the elements in the source sequence.
 * @template S The type of the elements in the source sequence that is truthy or falsy.
 * @param {AsyncIterable<T>} source Source async-iterable sequence.
 * @param {OptionalFindSubclassedOptions<T, S>} [options] The optional options which includes a predicate for filtering,
 * thisArg for predicate binding and an abort signal for cancellation.
 * @returns {(Promise<S | undefined>)} A promise with the single element in the async-iterable sequence that satisfies
 * the condition in the predicate, or undefined if no such element exists.
 */
export async function single<T, S extends T>(
  source: AsyncIterable<T>,
  options?: OptionalFindSubclassedOptions<T, S>
): Promise<S | undefined>;
/**
 * Returns the only element of an async-iterable sequence that matches the predicate if specified,
 * or undefined if no such element exists; this method reports an exception if there is more
 * than one element in the async-iterable sequence.
 *
 * @export
 * @template T The type of the elements in the source sequence.
 * @param {AsyncIterable<T>} source Source async-iterable sequence.
 * @param {OptionalFindOptions<T>} [options] The optional options which includes a predicate for filtering,
 * thisArg for predicate binding and an abort signal for cancellation.
 * @returns {(Promise<T | undefined>)} A promise with the single element in the async-iterable sequence that satisfies
 * the condition in the predicate, or undefined if no such element exists.
 */
export async function single<T>(
  source: AsyncIterable<T>,
  options?: OptionalFindOptions<T>
): Promise<T | undefined> {
  const opts = options || ({} as OptionalFindOptions<any>);
  if (!opts.predicate) {
    opts.predicate = async () => true;
  }
  const { ['signal']: signal, ['thisArg']: thisArg, ['predicate']: predicate } = opts;
  throwIfAborted(signal);
  let result: T | undefined;
  let hasResult = false;
  let i = 0;
  for await (const item of wrapWithAbort(source, signal)) {
    if (hasResult && (await predicate!.call(thisArg, item, i++, signal))) {
      throw new Error('More than one element was found');
    }
    if (await predicate!.call(thisArg, item, i++, signal)) {
      result = item;
      hasResult = true;
    }
  }

  return result;
}
