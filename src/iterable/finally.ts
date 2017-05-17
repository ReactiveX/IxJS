'use strict';

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

export function _finally<TSource>(
    source: Iterable<TSource>,
    action: () => void): Iterable<TSource> {
  return new FinalyIterable<TSource>(source, action);
}