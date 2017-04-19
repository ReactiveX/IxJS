'use strict';

import { ConcatIterable } from './concat';

export function startWith<T>(
    source: Iterable<T>,
    ...args: Iterable<T>[]) {
  return new ConcatIterable(...args.concat(source));
}