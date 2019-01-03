import { AsyncIterableX } from './asynciterablex';

interface AsyncResolver<T> {
  resolve: (value?: T | PromiseLike<T> | undefined) => void;
  reject: (reason?: any) => void;
}

interface WaitingState<T> {
  type: 'waiting';
  resolver: AsyncResolver<IteratorResult<T[]>>;
}
interface BatchingState<T> {
  type: 'batching';
  values: T[];
}

type State<T> = WaitingState<T> | BatchingState<T>;

function assertNever(value: never): never {
  throw new Error(`Unhandled discriminated union member ${value}`);
}

class BatchAsyncIterable<TSource> extends AsyncIterableX<TSource[]> {
  private _source: AsyncIterable<TSource>;

  constructor(source: AsyncIterable<TSource>) {
    super();
    this._source = source;
  }

  [Symbol.asyncIterator]() {
    const it = this._source[Symbol.asyncIterator]();

    let state: State<TSource> = { type: 'batching', values: [] };
    let ended: null | Promise<IteratorResult<TSource[]>> = null;

    function consumeNext() {
      it.next().then(
        res => {
          if (res.done) {
            ended = Promise.resolve({ done: true } as IteratorResult<TSource[]>);

            if (state.type === 'waiting') {
              state.resolver.resolve(ended);
            }
          } else {
            if (state.type === 'waiting') {
              const { resolve } = state.resolver;
              state = { type: 'batching', values: [] };
              resolve({ done: res.done, value: [res.value] });
            } else if (state.type === 'batching') {
              state.values.push(res.value);
            } else {
              assertNever(state);
            }

            consumeNext();
          }
        },
        err => {
          ended = Promise.reject(err);

          if (state.type === 'waiting') {
            const { reject } = state.resolver;
            reject(err);
          }
        }
      );
    }

    consumeNext();

    return {
      next() {
        if (state.type === 'batching' && state.values.length > 0) {
          const { values } = state;
          state.values = [];
          return Promise.resolve({ done: false, value: values });
        }

        if (ended) {
          return ended;
        }

        if (state.type === 'waiting') {
          throw new Error('Previous `next()` is still in progress');
        }

        return new Promise<IteratorResult<TSource[]>>((resolve, reject) => {
          state = {
            type: 'waiting',
            resolver: { resolve, reject }
          };
        });
      },

      return(value: any) {
        return it.return
          ? it.return(value).then(() => ({ done: true } as IteratorResult<TSource[]>))
          : Promise.resolve({ done: true } as IteratorResult<TSource[]>);
      }
    };
  }
}

/**
 * Returns an async iterable sequence of batches that are collected from the source sequence between
 * subsequent `next()` calls.
 */
export function batch<TSource>(source: AsyncIterable<TSource>): AsyncIterableX<TSource[]> {
  return new BatchAsyncIterable(source);
}
