import { IterableX } from '../iterable';

class FinalyIterable<TSource> extends IterableX<TSource> {
  private _source: Iterable<TSource>;
  private _action: () => void;

  constructor(source: Iterable<TSource>, action: () => void) {
    super();
    this._source = source;
    this._action = action;
  }

  *[Symbol.iterator]() {
    try {
      yield* this._source;
    } finally {
      this._action();
    }
  }
}

/**
 * Creates a sequence whose termination or disposal of an iterator causes a finally action to be executed.
 * @param {Iterator<T>} source Source sequence
 * @param {function(): void)} action Action to run upon termination of the sequence, or when an iterator is disposed.
 * @return {Iterable<T>} Source sequence with guarantees on the invocation of the finally action.
 */
export function _finally<TSource>(
    source: Iterable<TSource>,
    action: () => void): IterableX<TSource> {
  return new FinalyIterable<TSource>(source, action);
}
