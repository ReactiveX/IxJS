'use strict';

import { IterableX } from '../iterable';
import { concatStatic } from './concat';
import { _while } from './while';

export function doWhile<TSource>(source: Iterable<TSource>, condition: () => boolean): IterableX<TSource> {
  return concatStatic(source, _while(condition, source));
}