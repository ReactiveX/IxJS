import { AsyncIterableX } from '../asynciterablex';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { AbortError } from '../../aborterror';

export class DebounceAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _time: number;

  constructor(source: AsyncIterable<TSource>, time: number) {
    super();
    this._source = source;
    this._time = time;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    let done = false;
    let reject: (reason?: any) => void = () => {
      /**/
    };
    let resolve: (value?: TSource | PromiseLike<TSource>) => void = () => {
      /**/
    };
    let promise = new Promise<TSource>((r1, r2) => {
      resolve = r1;
      reject = r2;
    });
    (async () => {
      let id: any = null;

      const emitValue = (value: TSource) => {
        id = null;
        resolve(value);
        promise = new Promise<TSource>((r1, r2) => {
          resolve = r1;
          reject = r2;
        });
      };

      if (signal) {
        signal.addEventListener(
          'abort',
          () => {
            done = true;
            if (id) {
              clearTimeout(id);
            }
            id = null;
            reject(new AbortError());
          },
          { once: true }
        );
      }

      try {
        let result: IteratorResult<TSource>;
        // @ts-ignore
        const it = this._source[Symbol.asyncIterator](signal);
        // 1. check `!done`
        // 2. await next value
        // 3. check `!done` again, in case the signal aborted while the promise was pending
        while (!done && !(result = await it.next()).done && !done) {
          if (id) {
            clearTimeout(id);
          }
          id = setTimeout(emitValue, this._time, result.value);
        }
      } catch (e) {
        reject(e);
      }
      done = true;
    })();

    while (!done) {
      yield await promise;
    }
  }
}

export function debounce<TSource>(time: number): MonoTypeOperatorAsyncFunction<TSource> {
  return function debounceOperatorFunction(
    source: AsyncIterable<TSource>
  ): AsyncIterableX<TSource> {
    return new DebounceAsyncIterable<TSource>(source, time);
  };
}
