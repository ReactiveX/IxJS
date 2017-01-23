'use strict';

import { Iterable } from '../iterable';
import { AnonymousIterator } from './anonymousiterator';
import { $iterator$ } from '../symbol';

export class DeferIterable<T> extends Iterable<T> {
  private _fn: any;

  constructor(fn) {
    super();
    this._fn = fn;
  }

  [$iterator$]() {
    return new AnonymousIterator(this._fn());
  }
}