import { AsyncIterableX } from '../asynciterable';
import { forEach } from './foreach';

class DebounceAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _time: number;

  constructor(source: AsyncIterable<TSource>, time: number) {
    super();
    this._source = source;
    this._time = time;
  }

  async *[Symbol.asyncIterator]() {
    let noValue: boolean;
    let lastItem: TSource | undefined;
    let deferred: Promise<TSource>;
    let resolver: (value?: TSource | PromiseLike<TSource> | undefined) => void;
    let done: boolean = false;
    let hasError: boolean = false;
    let error: any;

    const reset = (hasNoValue: boolean) => {
      noValue = hasNoValue;
      lastItem = undefined;
      deferred = new Promise<TSource>(r => resolver = r);
    };

    const run = () => {
      if (lastItem === undefined) {
        noValue = true;
        return;
      }

      const item = lastItem;
      const res = resolver;
      reset(false);
      setTimeout(run, this._time);
      res(item);
    };

    reset(true);
    forEach(this._source, item => {
      lastItem = item;
      if (noValue) { run(); }
    })
    .then(() => done = true)
    .catch(err => { hasError = true; error = err; });

    while (1) {
      if (done) { break; }
      if (hasError) { throw error; }
      yield await deferred!;
    }
  }
}

export function debounce<TSource>(source: AsyncIterable<TSource>, time: number): AsyncIterableX<TSource> {
  return new DebounceAsyncIterable<TSource>(source, time);
}
