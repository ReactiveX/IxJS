import { AsyncIterableX } from './asynciterablex';
import { AsyncSink } from './asyncsink';
import { memoize } from './operators/memoize';

/**
 * Create an async-iterable from a callback function.
 * @param func The callback function to wrap as an async-iterable
 */
export function asyncify<TSource>(func: Function): (...args: any[]) => AsyncIterableX<TSource> {
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
