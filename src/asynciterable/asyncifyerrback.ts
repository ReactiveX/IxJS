import { AsyncIterableX } from '../asynciterable';
import { AsyncSink } from '../asyncsink';
import { memoize } from './memoize';

export function asyncifyErrback<TSource>(
  func: Function
): (...args: any[]) => AsyncIterableX<TSource> {
  return function(...args: any[]) {

    const sink = new AsyncSink<TSource>();

    const handler = function(err: any, ...innerArgs: any[]) {
      if (err) {
        sink.error(err);
        sink.end();
      } else {
        sink.write(innerArgs.length === 1 ? innerArgs[0] : innerArgs);
        sink.end();
      }
    };

    try {
      func(...args.concat(handler));
    } catch (e) {
      sink.error(e);
      sink.end();
    }

    return memoize(
      (async function*() {
        for (let next; !(next = await sink.next()).done; ) {
          yield next.value;
        }
      })()
    );
  };
}
