'use strict';

import { concatAll } from './concat';

export function startWith<T>(
    source: Iterable<T>,
    ...args: Iterable<T>[]) {
  return concatAll(args.concat(source));
}