import { AsyncSink } from '../asyncsink';
import { memoize } from './memoize';

export function fromEventPattern<TSource>(
    addHandler: (handler: (...args: any[]) => void) => void,
    removeHandler: (handler: (...args: any[]) => void) => void): AsyncIterable<TSource> {
  const sink = new AsyncSink<TSource>();
  const handler = (e: TSource) => sink.write(e);

  addHandler(handler);

  return memoize({
    [Symbol.asyncIterator]() {
      return {
        next() {
          return sink.next();
        },

        return() {
          removeHandler(handler);
          sink.end();
          return Promise.resolve({ done: true } as IteratorResult<TSource>);
        }
      };
    }
  });
}
