import { IterableX } from '../iterablex';
import { MonoTypeOperatorFunction } from '../../interfaces';

/** @ignore */
export class FinallyIterable<TSource> extends IterableX<TSource> {
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
 *  Invokes a specified asynchronous action after the source iterable sequence terminates gracefully or exceptionally.
 *
 * @template TSource The type of the elements in the source sequence.
 * @param {(() => void)} action Action to invoke and await asynchronously after the source iterable sequence terminates
 * @returns {MonoTypeOperatorFunction<TSource>} An operator that returns the source sequence with the
 * action-invoking termination behavior applied.
 */
export function finalize<TSource>(action: () => void): MonoTypeOperatorFunction<TSource> {
  return function finallyOperatorFunction(source: Iterable<TSource>): IterableX<TSource> {
    return new FinallyIterable<TSource>(source, action);
  };
}
