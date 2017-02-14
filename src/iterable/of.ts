'use strict';

import { ArrayIterable } from './arrayiterable';

export function of(...args) {
  return new ArrayIterable(args);
}