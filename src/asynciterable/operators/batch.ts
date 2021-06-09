import { AsyncIterableX } from '../asynciterablex';
import { OperatorAsyncFunction } from '../../interfaces';
import { wrapWithAbort } from './withabort';
import { throwIfAborted } from '../../aborterror';

interface AsyncResolver<T> {
  resolve: (value?: T | PromiseLike<T> | undefined) => void;
  reject: (reason?: any) => void;
}

const WAITING_TYPE = 'waiting';
const BATCHING_TYPE = 'batching';

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

export class BatchAsyncIterable<TSource> extends AsyncIterableX<TSource[]> {
  private _source: AsyncIterable<TSource>;

  constructor(source: AsyncIterable<TSource>) {
    super();
    this._source = source;
  }

  [Symbol.asyncIterator](signal?: AbortSignal) {
    throwIfAborted(signal);
    const it = wrapWithAbort(this._source, signal)[Symbol.asyncIterator]();

    let state: State<TSource> = { type: BATCHING_TYPE, values: [] };
    let ended: null | Promise<IteratorResult<TSource[]>> = null;
    let error: any = null;

    function consumeNext() {
      it.next().then(
        (res) => {
          if (res.done) {
            ended = Promise.resolve({ done: true } as IteratorResult<TSource[]>);

            if (state.type === WAITING_TYPE) {
              state.resolver.resolve(ended);
            }
          } else {
            if (state.type === WAITING_TYPE) {
              const { resolve } = state.resolver;
              state = { type: BATCHING_TYPE, values: [] };
              resolve({ done: res.done, value: [res.value] });
            } else if (state.type === BATCHING_TYPE) {
              state.values.push(res.value);
            } else {
              assertNever(state);
            }

            consumeNext();
          }
        },
        (err) => {
          error = err;
          if (state.type === WAITING_TYPE) {
            state.resolver.reject(err);
          }
        }
      );
    }

    consumeNext();

    return {
      next() {
        if (error) {
          return Promise.reject(error);
        }

        if (state.type === BATCHING_TYPE && state.values.length > 0) {
          const { values } = state;
          state.values = [];
          return Promise.resolve({ done: false, value: values });
        }

        if (ended) {
          return ended;
        }

        if (state.type === WAITING_TYPE) {
          throw new Error('Previous `next()` is still in progress');
        }

        return new Promise<IteratorResult<TSource[]>>((resolve, reject) => {
          state = {
            type: WAITING_TYPE,
            resolver: { resolve, reject },
          };
        });
      },

      return(value: any) {
        return it.return
          ? it.return(value).then(() => ({ done: true } as IteratorResult<TSource[]>))
          : Promise.resolve({ done: true } as IteratorResult<TSource[]>);
      },
    };
  }
}

/**
Returns an async iterable sequence of batches that are collected from the source sequence between
 * subsequent `next()` calls.
 *
 * @export
 * @template TSource The type of elements in the source sequence.
 * @returns {OperatorAsyncFunction<TSource, TSource[]>} An operator returning an async-iterable of batches that are collection from the
 * source sequence between subsequent `next()` calls.
 */
export function batch<TSource>(): OperatorAsyncFunction<TSource, TSource[]> {
  return function batchOperator(source: AsyncIterable<TSource>): AsyncIterableX<TSource[]> {
    return new BatchAsyncIterable(source);
  };
}
