'use strict';

import { AsyncIterableX } from '../asynciterable';
import { _concatAll } from './concat';

export function startWith<T>(
    source: AsyncIterable<T>,
    ...args: AsyncIterable<T>[]): AsyncIterableX<T> {
  return _concatAll(args.concat(source));
}