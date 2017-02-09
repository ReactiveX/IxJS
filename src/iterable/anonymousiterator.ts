'use strict';

import { IIterator, Iterator } from '../iterator';

export class AnonymousIterator extends Iterator {
  private _it: IIterator;

  constructor(it: IIterator) {
    super();
    this._it = it;
  }

  next() {
    return this._it.next();
  }
}