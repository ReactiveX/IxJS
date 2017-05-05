'use strict';

import { defer } from './defer';
import { empty } from './empty';

export async function* _if<T>(
    fn: () => boolean,
    thenSource: AsyncIterable<T>,
    elseSource = empty<T>()): AsyncIterable<T> {
  return defer<T>(() => fn() ? thenSource : elseSource);
}