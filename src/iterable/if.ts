'use strict';

import { defer } from './defer';
import { empty } from './empty';

export function* _if<T>(
    fn: () => boolean,
    thenSource: Iterable<T>,
    elseSource = empty<T>()) {
  return defer<T>(() => fn() ? thenSource : elseSource);
}