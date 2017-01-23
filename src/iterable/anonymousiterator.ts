'use strict';

import { Iterator } from '../iterator';
import { $iterator$ } from '../symbol';

export class AnonymousIterator<T> extends Iterator<T> {
  private _it: any;

  constructor(it) {
    super();
    this._it = it;
  }

  next() {
    return this._it.next();
  }
}