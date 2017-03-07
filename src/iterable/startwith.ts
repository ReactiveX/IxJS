'use strict';

import { IIterable } from '../iterable.interfaces';
import { ConcatIterable } from './concat';

export function startWith<T>(
    source: IIterable<T>,
    ...args: IIterable<T>[]) {
  return new ConcatIterable(...args.concat(source));
}