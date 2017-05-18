'use strict';

import { AsyncIterableX } from '../asynciterable';
import { defer } from './defer';
import { empty } from './empty';

export function _if<TSource>(
    fn: () => boolean,
    thenSource: AsyncIterable<TSource>,
    elseSource: AsyncIterable<TSource> = empty<TSource>()): AsyncIterableX<TSource> {
  return defer<TSource>(() => fn() ? thenSource : elseSource);
}