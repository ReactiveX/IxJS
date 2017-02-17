'use strict';

import { ArrayIterable } from './arrayiterable';

export function of<T>(...args: Array<T>) {
  return new ArrayIterable<T>(args);
}