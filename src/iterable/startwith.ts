'use strict';

import { IterableX } from '../iterable';
import { concatAll } from './concat';

export function startWith<TSource>(
    source: Iterable<TSource>,
    ...args: Iterable<TSource>[]): IterableX<TSource> {
  return concatAll(args.concat(source));
}