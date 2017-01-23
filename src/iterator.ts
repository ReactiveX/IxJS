'use strict';

import { $iterator$ } from './symbol';

export abstract class Iterator<T> {
  [$iterator$]() {
    return this;
  }

  abstract next();
}
