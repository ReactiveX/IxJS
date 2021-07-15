import { AsyncIterableX } from './asynciterablex';
import { AsyncSink } from './asyncsink';
import { memoize } from './operators/memoize';

/**
 * Converts the callback function into wrapped function which returns an async-iterable.
 *
 * @export
 * @template TSource The type of the value returned from the callback.
 * @param {Function} func The callback function to wrap as an async-iterable.
 * @returns {(...args: any[]) => AsyncIterableX<TSource>} A function when invoked, returns an async-iterable from the callback.
 */
export function asyncify<TSource>(
  func: (...xs: any[]) => any
): (...args: any[]) => AsyncIterableX<TSource> {
  return function (...args: any[]) {
    const sink = new AsyncSink<TSource>();

    const handler = function (...innerArgs: any[]) {
      sink.write(innerArgs.length === 1 ? innerArgs[0] : innerArgs);
      sink.end();
    };

    try {
      func(...args.concat(handler));
    } catch (e) {
      sink.error(e);
      sink.end();
    }

    const yielder = async function* () {
      for (let next; !(next = await sink.next()).done; ) {
        yield next.value;
      }
    };

    return memoize<TSource>()(yielder());
  };
}
