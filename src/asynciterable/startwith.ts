'use strict';

import { _concatAll } from './concat';

export function startWith<T>(
    source: AsyncIterable<T>,
    ...args: AsyncIterable<T>[]): AsyncIterable<T> {
  return _concatAll(args.concat(source));
}