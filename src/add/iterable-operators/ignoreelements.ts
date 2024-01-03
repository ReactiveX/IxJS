import { IterableX } from '../../iterable/iterablex.js';
import { ignoreElements } from '../../iterable/operators/ignoreelements.js';

/**
 * @ignore
 */
export function ignoreElementsProto<T>(this: IterableX<T>): IterableX<T> {
  return ignoreElements<T>()(this);
}

IterableX.prototype.ignoreElements = ignoreElementsProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    ignoreElements: typeof ignoreElementsProto;
  }
}
