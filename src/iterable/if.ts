'use strict';

import { IIterable } from '../iterable.interfaces';
import { DeferIterable } from './defer';
import { EmptyIterable } from './empty';

export function _if<T>(
    fn: () => boolean,
    thenSource: IIterable<T>,
    elseSource?: IIterable<T>) {
  elseSource || (elseSource = new EmptyIterable<T>());
  return new DeferIterable<T>(() => fn() ? thenSource : elseSource);
}