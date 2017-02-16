'use strict';

import { IIterator } from '../iterable.interfaces';
import { Iterator } from '../iterator';

export class AnonymousIterator<T> extends Iterator<T> {
  private _it: IIterator<T>;

  constructor(it: IIterator<T>) {
    super();
    this._it = it;
  }

  next() {
    return this._it.next();
  }
}