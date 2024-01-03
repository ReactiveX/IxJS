import { memoize } from './operators/memoize.js';
import { identity } from '../util/identity.js';
import { isFunction } from '../util/isiterable.js';
import { AsyncIterableX } from './asynciterablex.js';
import { AsyncSink } from './asyncsink.js';

const { isArray } = Array;

function callOrApply<T, R>(fn: (...values: T[]) => R, args: T | T[]): R {
  return isArray(args) ? fn(...args) : fn(args);
}

/**
 * Creates async-iterable from an event emitter by adding handlers for both listening and unsubscribing from events.
 *
 * @template TSource The type of elements in the event emitter.
 * @param {(handler: (...args: any[]) => void) => void} addHandler The function to add a listener to the source.
 * @param {(handler: (...args: any[]) => void) => void} removeHandler The function to remove a listener from the source.
 * @returns {AsyncIterableX<TSource>} An async-iterable which contains the data from the underlying events as wrapped by the handlers.
 */
export function fromEventPattern<TSource>(
  addHandler: (handler: (...args: any[]) => void) => void,
  removeHandler: (handler: (...args: any[]) => void) => void,
  resultSelector?: (...args: any[]) => TSource
): AsyncIterableX<TSource> {
  if (!isFunction(resultSelector)) {
    resultSelector = identity;
  }

  const sink = new AsyncSink<TSource>();
  const handler = (...args: any[]) => sink.write(callOrApply(resultSelector!, args));

  addHandler(handler);

  const loop = async function* () {
    try {
      for (let next; !(next = await sink.next()).done; ) {
        yield next.value;
      }
    } finally {
      removeHandler(handler);
      sink.end();
    }
  };

  return memoize<TSource>()(loop());
}
