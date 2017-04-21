'use strict';

import { DeferIterable } from './defer';
import { EmptyIterable } from './empty';

export function _if<T>(
    fn: () => boolean,
    thenSource: Iterable<T>,
    elseSource = new EmptyIterable<T>()) {
  return new DeferIterable<T>(() => fn() ? thenSource : elseSource);
}