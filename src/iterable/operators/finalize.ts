import { IterableX } from '../iterablex';
import { MonoTypeOperatorFunction } from '../../interfaces';

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

export function finalize<TSource>(action: () => void): MonoTypeOperatorFunction<TSource> {
  return function finallyOperatorFunction(source: Iterable<TSource>): IterableX<TSource> {
    return new FinallyIterable<TSource>(source, action);
  };
}
