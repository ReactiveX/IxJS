import { AsyncIterableX } from './asynciterablex';
import { AsyncSink } from './asyncsink';
import { memoize } from './operators/memoize';

export function fromEventPattern<TSource>(
  addHandler: (handler: (...args: any[]) => void) => void,
  removeHandler: (handler: (...args: any[]) => void) => void
): AsyncIterableX<TSource> {
  const sink = new AsyncSink<TSource>();
  const handler = (e: TSource) => sink.write(e);

  addHandler(handler);

  const yielder = async function*() {
    for (let next; !(next = await sink.next()).done; ) {
      yield next.value;
    }
    removeHandler(handler);
    sink.end();
  };

  return (memoize())(yielder());
}
